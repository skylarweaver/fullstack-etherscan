import { combineReducers } from 'redux';
import {
  SELECT_ETHADDRESS,
  REQUEST_TRANSACTIONS,
  RECEIVE_TRANSACTIONS,
  REQUEST_BALANCE,
  RECEIVE_BALANCE,
} from './actions';

function selectedEthAddress(state = '', action) {
  switch (action.type) {
    case SELECT_ETHADDRESS:
      return action.ethAddress;
    default:
      return state;
  }
}

function transactions(
  state = {
    isTransactionsFetching: false,
    transactions: [],
  },
  action,
) {
  switch (action.type) {
    case REQUEST_TRANSACTIONS:
      return Object.assign({}, state, {
        isTransactionsFetching: true,
      });
    case RECEIVE_TRANSACTIONS:
      return Object.assign({}, state, {
        isTransactionsFetching: false,
        transactions: action.transactions,
        transactionsLastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function transactionsByEthAddress(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
    case REQUEST_TRANSACTIONS:
      return Object.assign({}, state, {
        [action.ethAddress]: transactions(state[action.ethAddress], action),
      });
    default:
      return state;
  }
}

function balance(
  state = {
    isBalanceFetching: false,
    balance: '',
  },
  action,
) {
  switch (action.type) {
    case REQUEST_BALANCE:
      return Object.assign({}, state, {
        isBalanceFetching: true,
      });
    case RECEIVE_BALANCE:
      return Object.assign({}, state, {
        isBalanceFetching: false,
        balance: action.balance,
        balanceLastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function balanceByEthAddress(state = {}, action) {
  switch (action.type) {
    case RECEIVE_BALANCE:
    case REQUEST_BALANCE:
      return Object.assign({}, state, {
        [action.ethAddress]: balance(state[action.ethAddress], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  transactionsByEthAddress,
  balanceByEthAddress,
  selectedEthAddress,
});

export default rootReducer;
