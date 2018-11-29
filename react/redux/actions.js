import fetch from 'cross-fetch';

export const SELECT_ETHADDRESS = 'SELECT_ETHADDRESS';
export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const REQUEST_BALANCE = 'REQUEST_BALANCE';
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE';

export function selectEthAddress(ethAddress) {
  return {
    type: SELECT_ETHADDRESS,
    ethAddress,
  };
}

// TRANSACTIONS
function requestTransactions(ethAddress) {
  return {
    type: REQUEST_TRANSACTIONS,
    ethAddress,
  };
}

function receiveTransactions(ethAddress, transactionArray) {
  return {
    type: RECEIVE_TRANSACTIONS,
    ethAddress,
    transactions: transactionArray,
    receivedAt: Date.now(),
  };
}

function fetchTransactions(ethAddress) {
  return dispatch => {
    dispatch(requestTransactions(ethAddress));
    return fetch(`/v1/transactions/${ethAddress}`)
      .then(response => response.json())
      .then(transactionArray => dispatch(receiveTransactions(ethAddress, transactionArray)));
  };
}

// eslint-disable-next-line consistent-return
function shouldFetchTransactions(state, ethAddress) {
  const transactions = state.transactionsByEthAddress[ethAddress];
  if (!transactions) {
    return true;
  } if (transactions.isTransactionsFetching) {
    return false;
  }
}

export function fetchTransactionsIfNeeded(ethAddress) {
  // eslint-disable-next-line consistent-return
  return (dispatch, getState) => {
    if (shouldFetchTransactions(getState(), ethAddress)) {
      return dispatch(fetchTransactions(ethAddress));
    }
  };
}

// BALANCE
function requestBalance(ethAddress) {
  return {
    type: REQUEST_BALANCE,
    ethAddress,
  };
}

function receiveBalance(ethAddress, balanceObject) {
  return {
    type: RECEIVE_BALANCE,
    ethAddress,
    balance: balanceObject.balance,
    receivedAt: Date.now(),
  };
}

function fetchBalance(ethAddress) {
  return dispatch => {
    dispatch(requestBalance(ethAddress));
    return fetch(`/v1/balance/${ethAddress}`)
      .then(response => response.json())
      .then(balanceObject => dispatch(receiveBalance(ethAddress, balanceObject)));
  };
}

// eslint-disable-next-line consistent-return
function shouldFetchBalance(state, ethAddress) {
  const balance = state.balanceByEthAddress[ethAddress];
  if (!balance) {
    return true;
  } if (balance.isBalanceFetching) {
    return false;
  }
}

export function fetchBalanceIfNeeded(ethAddress) {
  // eslint-disable-next-line consistent-return
  return (dispatch, getState) => {
    if (shouldFetchBalance(getState(), ethAddress)) {
      return dispatch(fetchBalance(ethAddress));
    }
  };
}
