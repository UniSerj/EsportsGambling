# EsportsGambling

A app based on solidity for users to bet on esports game.

# Setup Instructions
1. Copy the contract EsportsGambling V2.sol in /src and Create the contract on [https://remix.ethereum.org/](https://remix.ethereum.org/).
2. Click 'Run' on the right side bar and select 'Web3 Provider' as your environment.
3. Click 'Create' to create the contract locally, copy the contract address and paste it to address in '/src/contract.json'
4. Create an account in [https://api.pandascore.co/](https://api.pandascore.co/) and copy the token to token in '/src/contract.json' 
5. Run `npm install` to install dependencies
6. Run `node server.js` to start the server
7. Run `npm run start` to start React App
8. Run `testrpc` to set local test environment and create test accounts.
9. Navigate to [http://localhost:3000/](http://localhost:3000/)

# User Guide
## Contents
- [Getting started on Homepage](#getting started on homepage)
- [Open bets Detail page](#open bets detail page)
- [Closed bets Detail page](#closed bets detail page)
- [Make a bet](#make a bet)
- [Get the balance](#get the balance)

## <a name="getting started on homepage"></a>Getting started on Homepage
* Step 1. Enter [http://localhost:3000/](http://localhost:3000/).
* Step 2. The whole Homepage can be divided into two parts: Open Bets and Closed Bets. Each of them is a table that includes 5 attributes:  
	- Match ID: The ID of the match
	- Game Name: It can be LoL, OverWatch and Dota 2
	- Match Time: The match start time and it’s also the end time for you to bet
	- Match: The match info: team 1 vs team 2
	- Match Link: The link for that particular match. You can click on that to enter the Bet Detail page.

## <a name="open bets detail page"></a>Open bets Detail page
* Step 1. Enter the link under **Match Link** of **Open Bets** table.
* Step 2. On Open bets detail page, you can have a view of the match ID, game, name, match info and the match time on top of the page.
* Step 3. There is progress bar presenting the bet status: how much has been already bet on team 1 and team 2.
* Step 4. You can make a bet on this page. The detail will be covered in [Make a bet](#make a bet).
* Step 5. You can have a view of all the bets you’ve made at the bottom of the page.

## <a name="closed bets detail page"></a>Closed bets Detail page
* Step 1. Enter the link under **Match Link** of **Closed Bets** table.
* Step 2. On Open bets detail page, you can have a view of the match ID, game, name, match info and the match time on top of the page.
* Step 3. There is progress bar presenting the bet status: how much has been already bet on team 1 and team 2.
* Step 4. You can Get the balance back if you’ve won. The detail will be covered in [Get the balance](#get the balance).
* Step 5. You can have a view of all the bets you’ve made at the bottom of the page.

## <a name="make a bet"></a>Make a bet
* Step 1. Select a match you want to bet on and Enter the link under **Match Link** of **Open Bets** table.
* Step 2. On the Match Detail page, you can have a view of the match info and bet status.
* Step 3. Enter the amount of Eth you want to bet and select the team you bet on under the heading  **Add Bet**.
* Step 4. Click **Place bet button**. Metamask will redirect you to a confirm page twice. One for transfer Bet ether, One for call function in contract.


## <a name="get the balance"></a>Get the balance
* Step 1. Go to the Closed Bets table and enter the link for the match you’ve betted on.
* Step 2. 
	- Choice 1: Click ‘Get the Balance’ and Metamask will redirect you to a confirm page to call the function in contract.
	- Choice 2: The contract will send ether to the winner on 12:00:00 AM everyday automatically.

