// Import React Modules
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import unit from 'ethjs-unit';

// Import Actions
import {
  selectEthAddress,
  fetchTransactionsIfNeeded,
  fetchBalanceIfNeeded,
} from '../../redux/actions';

// Import components
import SearchResultsTable from './SearchResultsTable/SearchResultsTable';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Initialize searchResult until it is returned from api call
      searchResult: this.props.transactions,
      loading: false,
    };

    props.actions.selectEthAddress(this.props.router.query.ethAddress);
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.query.ethAddress !== prevProps.router.query.ethAddress) {
      this.props.actions.selectEthAddress(this.props.router.query.ethAddress);
    }
    if (this.props.selectedEthAddress !== prevProps.selectedEthAddress) {
      this.props.actions.fetchTransactionsIfNeeded(this.props.selectedEthAddress);
      this.props.actions.fetchBalanceIfNeeded(this.props.selectedEthAddress);
    }
  }

  render() {
    return (
      <div >
        {
          <div>
            <div className="search-results">
                <h1 className="search-results-headline">Showing transactions for <span className="headline-number float-right">{this.props.selectedEthAddress}</span></h1>
                <h2 className="font-italic">Balance: {unit.fromWei(this.props.balance, 'ether')} Eth</h2>
              {
                this.props.isTransactionsFetching === false
                  ? <SearchResultsTable
                      searchResults={this.props.transactions}
                      ethAddress={this.props.selectedEthAddress}
                      balance={this.props.balance}
                    />
                  : <div className="loadingIndicator">
                    {/* <Loader/> */}
                    Fetching...
                  </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

SearchResults.propTypes = {
  selectedEthAddress: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
  isTransactionsFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  balanceLastUpdated: PropTypes.number,
  balance: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { selectedEthAddress, transactionsByEthAddress, balanceByEthAddress } = state;
  const { isTransactionsFetching, transactionsLastUpdated, transactions } = transactionsByEthAddress[
    selectedEthAddress
  ] || {
    isTransactionsFetching: true,
    transactions: [],
  };
  const { isBalanceFetching, balanceLastUpdated, balance } = balanceByEthAddress[
    selectedEthAddress
  ] || {
    isBalanceFetching: true,
    balance: '',
  };
  return {
    selectedEthAddress,
    transactions,
    isTransactionsFetching,
    transactionsLastUpdated,
    isBalanceFetching,
    balanceLastUpdated,
    balance,
  };
}

// Use redux to map loginSucceeded action to dispatch so we can call it in this component
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      selectEthAddress,
      fetchTransactionsIfNeeded,
      fetchBalanceIfNeeded,
    }, dispatch),
  };
};

// export default withRouter(SearchInputContainer);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
