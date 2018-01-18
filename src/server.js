const express = require('express');
var cron = require('cron');
var contractData = require('./contract.json');
var Web3 = require('web3');
var contract = require('truffle-contract');
var fetch = require('node-fetch');

var job = new cron.CronJob('00 57 15 * * 0-6', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at **:**:** AM. It does not run on Saturday
   * or Sunday.
   */
   // init contract
   const MyContract = contract({
    abi: contractData.ABI
   });

    if (typeof web3 !== 'undefined') {
      var web3 = new Web3(web3.currentProvider)
    } else {
      var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }

    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error)
        return
      }
      web3.eth.defaultAccount = accounts[0];
    });

    MyContract.setProvider(web3.currentProvider);

    // create contract sand call function
    var gamblingContract = MyContract.at(contractData.address);

    // gamblingContract.insertBet(21695,'0x5CF310E53F2530b4d853dE991869cA9e4B3bF3aa',1516242750,300,'KT',{gas:3000000})
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // gamblingContract.insertBet(21695,'0x240daE20c1Fe6D7f976f9BD2b0c8cdAA2795380a',1516242751,100,'AFS',{gas:3000000})
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    fetch("https://api.pandascore.co/matches/past?token=Io6C8Uoy3TCPpdo1TeW4IZupnE9Eae9bg-xfrspHiZLK_Vsai4g")
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        var matches = [];
        var time = new Date();
        time.setDate(time.getDate()-1);
        timestring = time.toISOString();

        for (var i = 0; i < data.length; i ++){
          if(data[i]['begin_at'] >= timestring){
            matches.push(data[i]);
          }
        }

        for (var i = 0; i<matches.length; i ++){
          if(matches[i]['winner']){
            console.log(parseInt(matches[i]['id']),matches[i]['winner']['acronym']);
            gamblingContract.autoTransaction(parseInt(matches[i]['id']),matches[i]['winner']['acronym'],{gas:3000000})
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
 }, null, true, 'Australia/Sydney'
);

job.start();

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));