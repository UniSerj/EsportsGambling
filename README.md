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