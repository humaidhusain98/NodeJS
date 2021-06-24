//dotenv
require("dotenv").config();
//dotenv

//----------Web3
const Web3 = require('web3'); 

//TestNet
const web3TestNet = new Web3(process.env.TESTNET_URL);

const web3MainNet = new Web3(process.env.MAINNET_URL);

//--------Web3

web3TestNet.eth.getAccounts((err,accounts)=>{
    console.log(accounts);
});




module.exports = {web3TestNet,web3MainNet};