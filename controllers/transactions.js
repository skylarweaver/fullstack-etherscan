const Transaction = require('../models/transaction');
const EtherscanService = require('../services/etherscan.js');

// Helpers
async function findAndUpdateMongoTransaction(transaction, ethAddress) {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate({ hash: transaction.hash }, { ...transaction, ethAddress }, { upsert: true });
    return updatedTransaction;
  } catch (error) {
    console.log('Error in findAndUpdateMongoTransaction: ', error);
    return error;
  }
}

// Route functions
async function findAll(ctx) {
  // Fetch all transaction’s from the database and return as payload
  const transactions = await Transaction.find({});
  ctx.body = transactions;
}

async function findTransactionsByAddress(ctx) {
  const ethAddress = ctx.params.address;
  const transactionsFromMongo = [];
  let transactionsFromEtherscan = [];
  //  First get transactions from etherScan
  try {
    const etherscanTransactionResponse = await EtherscanService.getEtherscanTransactionsByAddress(ethAddress);
    transactionsFromEtherscan = etherscanTransactionResponse.data.result;
  } catch (error) {
    console.log('Error: ', error); // This is likely b/c we've reached transaction throttling limit by etherScan
    ctx.body = { status: '0', message: 'No transactions found', result: [] };
    return;
  }

  // Update (or add) each transaction in mongodb
  // eslint-disable-next-line no-restricted-syntax
  for (const transaction of transactionsFromEtherscan) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const transactionFromMongo = await findAndUpdateMongoTransaction(transaction, ethAddress);
      transactionsFromMongo.push(transactionFromMongo);
    } catch (error) {
      console.log('Error inn findTransactionsByAddress:', error);
    }
  }
  ctx.body = transactionsFromMongo;
}

module.exports = {
  findAll,
  findTransactionsByAddress,
};
