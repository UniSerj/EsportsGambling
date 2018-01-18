const express = require('express');
var cron = require('cron');
var contractData = require('./contract.json');
var Web3 = require('web3');
var contract = require('truffle-contract');
var fetch = require('node-fetch');

var job = new cron.CronJob('00 00 12 * * 0-6', function() {
  /*
   * Runs every day
   * at 12:00:00 AM.
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

    // set test account
    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error)
        return
      }
      web3.eth.defaultAccount = accounts[0];
    });

    // set provider
    MyContract.setProvider(web3.currentProvider);

    // create contract and call function
    var gamblingContract = MyContract.at(contractData.address);

    // call API and get the data
    fetch("https://api.pandascore.co/matches/past?token="+contractData.token)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        var matches = [];

        // Only need the match info from yesterday to now
        var time = new Date();
        time.setDate(time.getDate()-1);
        timestring = time.toISOString();

        for (var i = 0; i < data.length; i ++){
          if(data[i]['begin_at'] >= timestring){
            matches.push(data[i]);
          }
        }

        // Make transaction automatically for all matches if there is a winner
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

app.listen(port, () => console.log(`Listening on port ${port}`));