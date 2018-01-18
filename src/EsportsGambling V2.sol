pragma solidity ^0.4.16;

contract EsportsGambling {

    struct Bet {
        uint id;
        uint match_id;
        address user_address;
        uint256 timestamp;
        uint256 amount;
        string team;
        uint index;
        bool paid;
    }
    
    mapping(uint => Bet) private Bets;
    
    uint[] private betIndex;
    
    event LogNewBet (uint betID, uint matchID, address userAddress, uint256 timestamp, uint256 amount, string team, uint index);
    event LogTransaction (uint matchID, address userAddress, uint finneyAmount);

    function() public payable { }

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // Bet initialize
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // check if the uint represents a bet
    function isBet(uint betID) public constant returns(bool isIndeed) {
        if(betIndex.length == 0) return false;
        return (betIndex[Bets[betID].index] == betID);
    }
    
    // insert a new bet with uint
    function insertBet(uint matchID, address userAddress, uint256 timestamp, uint256 amount, string team) public returns(uint index) {
        uint betID = betIndex.length;
        Bets[betID].id = betIndex.length;
        Bets[betID].match_id = matchID;
        Bets[betID].user_address = userAddress;
        Bets[betID].timestamp = timestamp;
        Bets[betID].amount = amount;
        Bets[betID].team = team;
        Bets[betID].paid = false;
        Bets[betID].index = betIndex.push(betID)-1;
        LogNewBet(betID, matchID, userAddress, timestamp, amount, team, Bets[betID].index);
        return betIndex.length-1;
    }
    
    // get bet
    function getBet(uint betID) public constant returns(uint matchID, address userAddress, uint256 timestamp, uint256 amount, string team, bool paid, uint index){
        if(!isBet(betID)) throw; 
        return(Bets[betID].match_id, Bets[betID].user_address, Bets[betID].timestamp, Bets[betID].amount, Bets[betID].team, Bets[betID].paid, Bets[betID].index);
    }
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // Transaction initialize
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    
    // compare string
    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
        // @todo unroll this loop
        for (uint i = 0; i < a.length; i ++)
            if (a[i] != b[i])
                return false;
        return true;
    }

    // get teams bets amount
    function getBets(uint matchID) public constant returns (uint team1_bet, string team1, uint team2_bet, string team2) {
        for (uint i = 0; i < betIndex.length; i ++){
            if(Bets[betIndex[i]].match_id == matchID){
                team1 = Bets[betIndex[i]].team;
            }
        }
        for (uint j = 0; j < betIndex.length; j ++){
            uint index = betIndex[j];
            if(Bets[index].match_id == matchID){
                if(!stringsEqual(Bets[index].team, team1)){
                    team2 = Bets[index].team;
                }
                if(stringsEqual(Bets[index].team, team1)){
                    team1_bet += Bets[index].amount;
                } else {
                    team2_bet += Bets[index].amount;
                }
            }
        }
        return (team1_bet, team1, team2_bet, team2);
    }
    
    //get User Bets
    function getUserBets(uint matchID, address userAddress) public constant returns (uint []){
        uint [] betIDs;
        for (uint i = 0; i < betIndex.length; i ++){
            uint index = betIndex[i];
            if(Bets[index].match_id == matchID && Bets[index].user_address == userAddress){
                betIDs.push(index);
            }
        }
        return betIDs;
    }
    
    // make transaction after the results have been released
    function makeTransaction(uint matchID, string winning_team, address userAddress) public returns(bool succeed) {
        uint [] odds;
        uint totalAmount = 0;
        uint winningAmount = 0;
        for (uint i = 0; i < betIndex.length; i ++){
            uint index = betIndex[i];
            if(Bets[index].match_id == matchID){
                totalAmount += Bets[index].amount;
                if(stringsEqual(Bets[index].team, winning_team)){
                    winningAmount += Bets[index].amount;   
                }
            }
        }
        
        // The amount has been multiplied by 100 times, the odds has been multiplied by 1000 times. (in order to have fake float type)
        uint multiplier = 1000;
        if(winningAmount == 0){
            return true;
        } else {
            uint x = (totalAmount * multiplier) / winningAmount;
            odds.push(x);
            odds.push(3);
            uint a = 1 finney;
            
            for (uint j = 0; j < betIndex.length; j ++){
                uint k = betIndex[j];
                if(Bets[k].match_id == matchID && Bets[k].user_address == userAddress){
                    if(!Bets[k].paid && stringsEqual(Bets[k].team,winning_team)){
                        Bets[k].user_address.transfer(odds[0]*Bets[k].amount/100*a);
                        LogTransaction(matchID, Bets[k].user_address, odds[0]*Bets[k].amount/100);
                    }
                    Bets[k].paid = true;
                }
            }
            return true;
        }
    }
    
    // make transaction everyday automatically
    function autoTransaction(uint matchID, string winning_team) public returns(bool succeed) {
        uint [] odds;
        uint totalAmount = 0;
        uint winningAmount = 0;
        for (uint i = 0; i < betIndex.length; i ++){
            uint index = betIndex[i];
            if(Bets[index].match_id == matchID){
                totalAmount += Bets[index].amount;
                if(stringsEqual(Bets[index].team, winning_team)){
                    winningAmount += Bets[index].amount;   
                }
            }
        }
        // The amount has been multiplied by 100 times, the odds has been multiplied by 1000 times. (in order to have fake float type)
        uint multiplier = 1000;
        if(winningAmount == 0){
            return true;
        } else {
            uint x = (totalAmount * multiplier) / winningAmount;
            odds.push(x);
            odds.push(3);
            uint a = 1 finney;
            
            for (uint j = 0; j < betIndex.length; j ++){
                uint k = betIndex[j];
                if(Bets[k].match_id == matchID){
                    if(!Bets[k].paid && stringsEqual(Bets[k].team,winning_team)){
                        Bets[k].user_address.transfer(odds[0]*Bets[k].amount/100*a);
                        LogTransaction(matchID, Bets[k].user_address, odds[0]*Bets[k].amount/100);
                        Bets[k].paid = true;
                    }
                }
            }
            return true;
        }
    }
    
}