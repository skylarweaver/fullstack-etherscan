const axios = require('axios');

const apiKey = process.env.ETHERSCAN_API_KEY;

module.exports = {
  getEtherscanTransactionsByAddress: async (ethAddress) => {
    try {
      const res = await axios.get(`http://api.etherscan.io/api?module=account&action=txlist&address=${ethAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`);
      return res;
    } catch (error) {
      console.log('Error in getEtherscanTransactionsByAddress: ', error);
      return error;
    }
  },
  getEtherscanBalanceByAddress: async (ethAddress) => {
    try {
      const res = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${ethAddress}&tag=latest&apikey=${apiKey}`);
      return res;
    } catch (error) {
      console.log('Error in getEtherscanBalanceByAddress: ', error);
      return error;
    }
  },
};
