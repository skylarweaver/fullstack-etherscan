// Import React Modules
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Import Scenes
import SearchInput from './SearchInput/SearchInput';

// Import Redux Action and Types
import {
  selectEthAddress,
  fetchTransactionsIfNeeded,
} from '../../redux/actions';

class SearchInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethAddress: '',
      isBtnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const ethAddress = evt.target.value;
    if (ethAddress.length > 42) {
      this.setState({
        ethAddress,
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        ethAddress: evt.target.value,
        isBtnDisabled: true,
      });
    }
  }

  render() {
    return (
      <div >
        <SearchInput handleChange={this.handleChange}
        ethAddress={this.state.ethAddress}
        isBtnDisabled={this.state.isBtnDisabled}
        />
      </div>
    );
  }
}

SearchInputContainer.propTypes = {
  selectedEthAddress: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selectedEthAddress, transactionsByEthAddress } = state;
  const { isFetching, lastUpdated, transactions } = transactionsByEthAddress[
    selectedEthAddress
  ] || {
    isFetching: true,
    transactions: [],
  };

  return {
    selectedEthAddress,
    transactions,
    isFetching,
    lastUpdated,
  };
}

// Use redux to map loginSucceeded action to dispatch so we can call it in this component
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      selectEthAddress,
      fetchTransactionsIfNeeded,
    }, dispatch),
  };
};

// export default withRouter(SearchInputContainer);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchInputContainer));
