const mongoose = require('mongoose');

// Declare Schema
const balanceSchema = new mongoose.Schema(
  {
    ethAddress: { type: String },
    status: { type: String },
    message: { type: String },
    balance: { type: String },
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
// eslint-disable-next-line no-unused-vars
const Balance = mongoose.model('Balance', balanceSchema);

// Export Model to be used in Node
module.exports = mongoose.model('Balance');
