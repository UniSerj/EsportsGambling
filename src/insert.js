import React, { Component } from 'react';
import './App.css';

class Insert extends Component {
  constructor (props) {
    super (props);

    const MyContract = window.web3.eth.contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "betID",
            "type": "uint256"
          },
          {
            "name": "matchID",
            "type": "uint256"
          },
          {
            "name": "userAddress",
            "type": "address"
          },
          {
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "team",
            "type": "string"
          }
        ],
        "name": "insertBet",
        "outputs": [
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "betID",
            "type": "uint256"
          }
        ],
        "name": "getBet",
        "outputs": [
          {
            "name": "matchID",
            "type": "uint256"
          },
          {
            "name": "userAddress",
            "type": "address"
          },
          {
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "team",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "matchID",
            "type": "uint256"
          }
        ],
        "name": "getMatch",
        "outputs": [
          {
            "name": "team1",
            "type": "string"
          },
          {
            "name": "team2",
            "type": "string"
          },
          {
            "name": "start_time",
            "type": "uint256"
          },
          {
            "name": "end_time",
            "type": "uint256"
          },
          {
            "name": "bets",
            "type": "uint256[]"
          },
          {
            "name": "winning_team",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getAllMatchID",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "betID",
            "type": "uint256"
          }
        ],
        "name": "isBet",
        "outputs": [
          {
            "name": "isIndeed",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "matchID",
            "type": "uint256"
          }
        ],
        "name": "isMatch",
        "outputs": [
          {
            "name": "isIndeed",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "matchID",
            "type": "uint256"
          },
          {
            "name": "winning_team",
            "type": "string"
          }
        ],
        "name": "makeTransaction",
        "outputs": [
          {
            "name": "succeed",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "matchID",
            "type": "uint256"
          },
          {
            "name": "team1",
            "type": "string"
          },
          {
            "name": "team2",
            "type": "string"
          },
          {
            "name": "start_time",
            "type": "uint256"
          },
          {
            "name": "end_time",
            "type": "uint256"
          }
        ],
        "name": "insertMatch",
        "outputs": [
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "matchID",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "team1",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "team2",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "start_time",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "end_time",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "LogNewMatch",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "betID",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "matchID",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "userAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "team",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "LogNewBet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "matchID",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "winning_team",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "odds",
            "type": "uint256[]"
          },
          {
            "indexed": false,
            "name": "winningAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "totalAmount",
            "type": "uint256"
          }
        ],
        "name": "LogResult",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "matchID",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "userAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "finneyAmount",
            "type": "uint256"
          }
        ],
        "name": "LogTransaction",
        "type": "event"
      }
    ]);

    this.state = {
      ContractInstance: MyContract.at('0xf15e9f59fab28df69a974ed37288315ee5a0f02b'),
      matchID: '',
      team1: '',
      team2: '',
      start_time: '',
      end_time: '',
      betID: '',
      match_id:'',
      user_address: '',
      timestamp: '',
      amount: '',
      team: '',
      winning_team: ''
    }

    var events = this.state.ContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

    // watch for changes
    events.watch(function(error, event){
      if (!error)
        console.log(event);
    });

    this.handleCreateMatch = this.handleCreateMatch.bind(this);
    this.getMatch = this.getMatch.bind(this);
    this.handleCreateBet = this.handleCreateBet.bind(this);
    this.getBet = this.getBet.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
  }

  handleCreateMatch (event) {
    event.preventDefault();

    const {insertMatch} = this.state.ContractInstance;
    const matchID = this.state.matchID;
    const team1 = this.state.team1;
    const team2 = this.state.team2;
    const start_time = this.state.start_time;
    const end_time = this.state.end_time;
    insertMatch (
      parseInt(matchID),team1,team2,parseFloat(start_time),parseFloat(end_time), (err, result) => {
        console.log('Create new Match');
      }
    )
  }

  getMatch () {
    const {getMatch} = this.state.ContractInstance;
    const matchID = this.state.matchID;
    getMatch (
      parseInt(matchID),(err, result) => {
        console.log(result);
      }
    )
  }

  handleCreateBet (event) {
    event.preventDefault();

    const {insertBet} = this.state.ContractInstance;
    const betID = this.state.betID;
    const match_id = this.state.match_id;
    const user_address = this.state.user_address;
    const timestamp = this.state.timestamp;
    var amount = parseFloat(this.state.amount)*100;
    const team = this.state.team;
    var send = window.web3.eth.sendTransaction({from:window.web3.eth.coinbase,to:'0xf15e9f59fab28df69a974ed37288315ee5a0f02b', value:window.web3.toWei(this.state.amount, "ether")}, function (err, result){
      if(!err){
        insertBet (
          parseInt(betID),parseInt(match_id),user_address,parseInt(timestamp),parseInt(amount),team,(err, result) => {
            console.log('Create new Bet');
          }
        )
      }
      else
        console.error(err);
    });
  }

  getBet () {
    const {getBet} = this.state.ContractInstance;
    const betID = this.state.betID;
    getBet (
      parseInt(betID),(err, result) => {
        console.log(result);
      }
    )
  }

  makeTransaction () {
    const {makeTransaction} = this.state.ContractInstance;
    const matchID = this.state.matchID;
    const winning_team = this.state.winning_team;
    makeTransaction(
      parseInt(matchID),winning_team,(err,odds) => {
        console.log(odds);
      }
    )
  }

  render () {
    return (
      <div className="App">
        <h3> Create Match </h3>
        <br />
        <form onSubmit={this.handleCreateMatch}>
          <input
            type="text"
            name="matchID"
            placeholder="Enter match ID..."
            value={this.state.matchID}
            onChange={event => this.setState({matchID: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="team1"
            placeholder="Enter team1 name..."
            value={this.state.team1}
            onChange={event => this.setState({team1: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="team2"
            placeholder="Enter team2 name..."
            value={this.state.team2}
            onChange={event => this.setState({team2: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="start_time"
            placeholder="Enter start_time..."
            value={this.state.start_time}
            onChange={event => this.setState({start_time: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="end_time"
            placeholder="Enter end_time..."
            value={this.state.end_time}
            onChange={event => this.setState({end_time: event.target.value})}/>
          <br />
          <br />
          <button type="submit"> Create Match </button>
        </form>
        <h3> Get Match </h3>
        <br />
        <input
          type="text"
          name="matchID"
          placeholder="Enter matchID..."
          value={this.state.matchID}
          onChange={event => this.setState({matchID: event.target.value})}/>
        <button onClick={this.getMatch}> Get Match </button>
        <h3> Create Bet </h3>
        <br />
        <form onSubmit={this.handleCreateBet}>
          <input
            type="text"
            name="betID"
            placeholder="Enter bet ID..."
            value={this.state.betID}
            onChange={event => this.setState({betID: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="match_id"
            placeholder="Enter match_id..."
            value={this.state.match_id}
            onChange={event => this.setState({match_id: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="user_address"
            placeholder="Enter user_address..."
            value={this.state.user_address}
            onChange={event => this.setState({user_address: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="timestamp"
            placeholder="Enter timestamp..."
            value={this.state.timestamp}
            onChange={event => this.setState({timestamp: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="amount"
            placeholder="Enter amount..."
            value={this.state.amount}
            onChange={event => this.setState({amount: event.target.value})}/>
          <br />
          <br />
          <input
            type="text"
            name="team"
            placeholder="Enter team..."
            value={this.state.team}
            onChange={event => this.setState({team: event.target.value})}/>
          <br />
          <br />
          <button type="submit"> Create Bet </button>
        </form>
        <h3> Get Bet </h3>
        <br />
        <input
          type="text"
          name="betID"
          placeholder="Enter betID..."
          value={this.state.betID}
          onChange={event => this.setState({betID: event.target.value})}/>
        <button onClick={this.getBet}> Get Bet </button>
        <h3> Make Transaction </h3>
        <input
          type="text"
          name="matchID"
          placeholder="Enter matchID..."
          value={this.state.matchID}
          onChange={event => this.setState({matchID: event.target.value})}/>
        <br />
        <br />
        <input
          type="text"
          name="winning_team"
          placeholder="Enter winning_team..."
          value={this.state.winning_team}
          onChange={event => this.setState({winning_team: event.target.value})}/>
        <br />
        <br />
        <button onClick={this.makeTransaction}> Make Transaction </button>
      </div>
    );
  }
}

export default Insert;