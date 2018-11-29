const mongoose = require('mongoose');

// Declare Schema
const transactionSchema = new mongoose.Schema(
  {
    ethAddress: { type: String },
    blockNumber: { type: String },
    blockHash: { type: String },
    timeStamp: { type: String },
    hash: { type: String },
    nonce: { type: String },
    transactionIndex: { type: String },
    from: { type: String },
    to: { type: String },
    value: { type: String },
    gas: { type: String },
    gasPrice: { type: String },
    input: { type: String },
    contractAddress: { type: String },
    cumulativeGasUsed: { type: String },
    txreceipt_status: { type: String },
    gasUsed: { type: String },
    confirmations: { type: String },
    isError: { type: String },
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
// eslint-disable-next-line no-unused-vars
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export Model to be used in Node
module.exports = mongoose.model('Transaction');
