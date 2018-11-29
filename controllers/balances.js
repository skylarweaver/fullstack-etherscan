const Balance = require('../models/balance');
const EtherscanService = require('../services/etherscan.js');

// Helpers
async function findAndUpdateMongoBalance(balance, ethAddress) {
  try {
    const updatedBalance = await Balance.findOneAndUpdate({ ethAddress }, { balance, ethAddress }, { new: true, upsert: true });
    return updatedBalance;
  } catch (error) {
    console.log('Error in findAndUpdateMongoBalance: ', error);
    return error;
  }
}

// Route functions
async function findAll(ctx) {
  // Fetch all balance’s from the database and return as payload
  const balances = await Balance.find({});
  ctx.body = balances;
}

async function findBalancesByAddress(ctx) {
  const ethAddress = ctx.params.address;
  // First get balances from etherScan
  const etherscanBalanceResponse = await EtherscanService.getEtherscanBalanceByAddress(ethAddress);
  const balanceFromEtherscan = etherscanBalanceResponse.data.result;
  // Then get balance from db
  // Then update balance in db based on Etherscan balance
  const updatedBalance = await findAndUpdateMongoBalance(balanceFromEtherscan, ethAddress);
  ctx.body = updatedBalance;
}

module.exports = {
  findAll,
  findBalancesByAddress,
};
