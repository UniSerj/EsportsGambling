import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom';
import { Line } from 'rc-progress';
import contractData from './contract.json';

class ContractAPI extends Component {
  constructor (props) {
    super (props);

    // init contract
    const MyContract = window.web3.eth.contract(contractData.ABI);

    if(props.index){
      // if it's match_detail page
      this.state = {
        ContractInstance: MyContract.at(contractData.address),
        UpcomingMatches:[],
        PastMatches:[],
        matchinfo:[],
        bets:{},
        page:'match',
        amount:0,
        userBets:[],
        selected_team:null
      };
      this.getMatch(props.index);
      this.getBets(props.index);
      this.getUserBets(props.index,window.web3.eth.coinbase);
    } else {
      // if it's homepage
      this.state = {
        ContractInstance: MyContract.at(contractData.address),
        UpcomingMatches:[],
        PastMatches:[],
        matchinfo:[],
        page:'home'
      };  
    }

    // fetch match data (upcoming and past)
    this.getUpcomingMatch();
    this.getPastMatch();

    //bind event handler
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
  }


  componentDidMount() {
  }

  getUpcomingMatch() {
    var self = this;
    fetch("https://api.pandascore.co/matches/upcoming?token="+contractData.token)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        self.setState({UpcomingMatches:data});
      })
  }  

  getPastMatch() {
    var self = this;
    fetch("https://api.pandascore.co/matches/past?token="+contractData.token)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        self.setState({PastMatches:data});
      })
  }

  getMatch(id){
    var self = this;
    fetch("https://api.pandascore.co/matches/"+id+"?token="+contractData.token)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        var matchinfo = [];
        matchinfo.push(data);
        self.setState({matchinfo:matchinfo});
      }) 
  }

  getBets (matchID) {
    var self = this;
    const {getBets} = this.state.ContractInstance;
    getBets (
      parseInt(matchID), (err, result) => {
        var bets = {};
        if(result[1] != ''){
          bets[result[1]] = parseFloat(result[0]['c'][0])/100;
        }
        if(result[3] != ''){
          bets[result[3]] = parseFloat(result[2]['c'][0])/100;
        }
        self.setState({bets:bets});
      }
    );
  }

  getUserBets(matchID,userAddress) {
    var self = this;
    console.log(matchID, userAddress);
    const {getUserBets} = this.state.ContractInstance;
    getUserBets(
      parseInt(matchID), userAddress, (err, result) => {
        console.log(result);
        for (var i = 0; i < result.length; i ++){
          const {getBet} = self.state.ContractInstance;
          getBet(
            result[i]['c'][0], (err,result) =>{
              var userBets = self.state.userBets.slice();
              userBets.push(result);
              self.setState({userBets:userBets});
            }
          );
        }
      }
    );
  }

  handleSubmit (event){
    event.preventDefault();
    var matchid = this.state.matchinfo[0]['id'];
    var userAddress = window.web3.eth.coinbase;
    var amount = parseFloat(this.state.amount)*100;
    var utc = new Date().getTime();
    var team = this.state.selected_team;
    console.log(matchid,userAddress,amount,utc,team);
    if(amount <= 0 || team == null){
      alert('Please enter bet info');
    } else {
      const {insertBet} = this.state.ContractInstance;
      var send = window.web3.eth.sendTransaction({from:window.web3.eth.coinbase,to:contractData.address, value:window.web3.toWei(this.state.amount, "ether")}, function (err, result){
        if(!err){
          insertBet(
            parseInt(matchid), userAddress, parseInt(utc), parseInt(amount), team, (err, result) => {
              alert('Create Bet');
            }
          );
        }
        else
          console.error(err);
      });
    }
  }

  makeTransaction () {
    var matchid = this.state.matchinfo[0]['id'];
    var winner = this.state.matchinfo[0]['winner']['acronym'];
    var userAddress = window.web3.eth.coinbase;
    const {makeTransaction} = this.state.ContractInstance;
    makeTransaction(
      parseInt(matchid), winner, userAddress, (err, result) => {
        alert('Sending the Balance');
      }
    );
  }


  render() {
    var self = this;

    //openMatches for homepage
    var openMatches = this.state.UpcomingMatches.map(function(i){
      const dateToFormat = new Date(i['begin_at']);
      var link = "/match/"+i['id'];
      return(
        <tr key={i['id']}>
          <td>#{i['id']}</td>
          <td>{i['videogame']['name']}</td>
          <td><Moment date={dateToFormat} tz='Australia/Sydney' format="YYYY/MM/DD HH:mm"></Moment></td>
          <td>{i['opponents'][0]['opponent']['acronym']} vs {i['opponents'][1]['opponent']['acronym']}</td>
          <td><Link to={link}>Bet</Link></td>
        </tr>
      );
    });

    //closedMatches for homepage
    var closedMatches = this.state.PastMatches.map(function(i){
      const dateToFormat = new Date(i['begin_at']);
      if(i['winner']){
        var winner = i['winner']['acronym'];
      } else {
        var winner = null;
      }
      var link = "/match/"+i['id'];
      return(
        <tr key={i['id']}>
          <td>#{i['id']}</td>
          <td>{i['videogame']['name']}</td>
          <td><Moment date={dateToFormat} tz='Australia/Sydney' format="YYYY/MM/DD HH:mm"></Moment></td>
          {winner == i['opponents'][0]['opponent']['acronym'] && 
            <td> <b>{i['opponents'][0]['opponent']['acronym']}</b> vs {i['opponents'][1]['opponent']['acronym']} </td>
          }
          {winner == i['opponents'][1]['opponent']['acronym'] && 
            <td> {i['opponents'][0]['opponent']['acronym']} vs <b>{i['opponents'][1]['opponent']['acronym']}</b> </td>
          }
          {winner == null &&
            <td> {i['opponents'][0]['opponent']['acronym']} vs {i['opponents'][1]['opponent']['acronym']} </td>
          }
          {winner == null && 
            <td> Not released</td>
          }
          {winner != null && 
            <td><Link to={link}>See the Result</Link></td>
          }
        </tr>
      )
    });

    //Match Detail for matchpage
    var MatchDetail = this.state.matchinfo.map(function(i){
      //match info
      const dateToFormat = new Date(i['begin_at']);
      if(i['winner']){
        var winner = i['winner']['acronym'];
      } else {
        var winner = null;
      }

      //bet info
      var team1_bet = self.state.bets[i['opponents'][0]['opponent']['acronym']];
      var team2_bet = self.state.bets[i['opponents'][1]['opponent']['acronym']];
      if(team1_bet === undefined) {
        team1_bet = 0.0;
      }
      if(team2_bet === undefined) {
        team2_bet = 0.0;
      }
      if((team1_bet+team2_bet) != 0){
        var percent = parseInt(100*(team1_bet/(team1_bet+team2_bet)));
      }

      //User Bets
      var UserBets = self.state.userBets.map(function(i){
        if(i){
          const dateToFormat = i[2]['c'][0];
          const amount = i[3]['c'][0]/100;
          const team = i[4];
          var paid;
          if(i[5]){
            paid = 'True';
          } else {
            paid = 'False';
          }
          return(
            <tr key={i[6]['c'][0]}>
              <td><Moment tz='Australia/Sydney' format="YYYY/MM/DD HH:mm">{dateToFormat}</Moment></td>
              <td>{team}</td>
              <td>{amount}</td>
              <td>{paid}</td>
            </tr>
          );
        }
      });

      if(winner == null){
        return(
          <div className='matchinfo' key={i['id']}>
            <h3>
              {i['videogame']['slug']}
            </h3>
            <h3>
              {i['opponents'][0]['opponent']['acronym']} vs {i['opponents'][1]['opponent']['acronym']}
            </h3>
            <h4>
              <Moment date={dateToFormat} tz='Australia/Sydney' format="YYYY/MM/DD HH:mm"></Moment>
            </h4>
            <div className='progress-bar'>
              <table width='100%'>
                <thead>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{i['opponents'][0]['opponent']['acronym']} ({team1_bet} Eth)</p>
                    </td>
                    <td width='70%'>
                      <Line percent={percent} strokeColor='#FFB90F' trailColor='#63B8FF' strokeLinecap='square' />
                    </td>
                    <td>
                      <p>{i['opponents'][1]['opponent']['acronym']} ({team2_bet} Eth)</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>
              Add Bet
            </h3>
            <form onSubmit={self.handleSubmit}>
              <label>
                <input type="text" name="Eth" onChange={event => self.setState({amount: event.target.value})} /> Eth
              </label>
              <br />
              <br />
              <input type="radio" name='team' value={i['opponents'][0]['opponent']['acronym']} 
              onChange={event => self.setState({selected_team:event.target.value})}/> {i['opponents'][0]['opponent']['acronym']}
              <br />
              <input type="radio" name='team' value={i['opponents'][1]['opponent']['acronym']} 
              onChange={event => self.setState({selected_team:event.target.value})}/> {i['opponents'][1]['opponent']['acronym']}
              <br />
              <br />
              <input type="submit" value="Place bet" />
            </form>
            <h3>
              Your Bets
            </h3>
            <table width='100%'>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Team</th>
                  <th>Amount</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <tbody>
              {UserBets}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div className='matchinfo' key={i['id']}>
            <h3>
              {i['videogame']['slug']}
            </h3>
            <h3>
              {i['opponents'][0]['opponent']['acronym']} vs {i['opponents'][1]['opponent']['acronym']}
            </h3>
            <h4>
              <Moment date={dateToFormat} tz='Australia/Sydney' format="YYYY/MM/DD HH:mm"></Moment>
            </h4>
            <div className='progress-bar'>
              <table width='100%'>
                <thead>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>{i['opponents'][0]['opponent']['acronym']} ({team1_bet} Eth)</p>
                    </td>
                    <td width='70%'>
                      <Line percent={percent} strokeColor='#FFB90F' trailColor='#63B8FF' strokeLinecap='square' />
                    </td>
                    <td>
                      <p>{i['opponents'][1]['opponent']['acronym']} ({team2_bet} Eth)</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>
              Winner: {winner}
              <br />
              <br />
              <button onClick={self.makeTransaction}> Get the Balance </button>
            </h3>
            <h3>
              Your Bets
            </h3>
            <table width='100%'>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Team</th>
                  <th>Amount</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <tbody>
              {UserBets}
              </tbody>
            </table> 
          </div>
        );
      }
    });

    // actual render begin
    if(this.state.page == 'home'){
      return (
        <div>
          <h1> Esports Gambling </h1>
          <h3> Open Bets </h3>
          <table width='100%'>
            <thead>
            <tr>
              <th>Match ID</th>
              <th>Game Name</th>
              <th>Match Time</th>
              <th>Match</th>
              <th>Match Link</th>
            </tr>
            </thead>
            <tbody>
            {openMatches}
            </tbody>
          </table>
          <h3> Closed Bets </h3>
          <table width='100%'>
            <thead>
            <tr>
              <th>Match ID</th>
              <th>Game Name</th>
              <th>Match Time</th>
              <th>Match</th>
              <th>Match Link</th>
            </tr>
            </thead>
            <tbody>
            {closedMatches}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className='content'>
          {MatchDetail}
        </div>
      );
    }


  }

}
export default ContractAPI;