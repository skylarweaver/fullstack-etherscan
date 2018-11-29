import React, { Component } from 'react';
import PropTypes from 'prop-types';
import unit from 'ethjs-unit';

class SearchResultsTable extends Component {
  render() {
    // Dyanmically generate each table row based on data received from api
    const searchResultTableRows = this.props.searchResults.map((transaction) => {
      const transactionHashLength = transaction.hash.length;
      const truncatedHash = `${transaction.hash.substring(0, 4)}...${transaction.hash.substring(transactionHashLength - 4, transactionHashLength)}`;
      return <tr key={transaction.hash}>
                <td>
                  <a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">
                    {truncatedHash}
                  </a>
                </td>
                <td>{transaction.confirmations}</td>
                <td>{unit.fromWei(transaction.value, 'ether')}</td>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>{transaction.gas}</td>
             </tr>;
    });
    return (
      this.props.searchResults.length > 0 // Check if search result sets is not empty
        ? <div className="searchResultTable">
            <div className="searchResultTable-count">
              <p>Showing {this.props.searchResults.length} total transactions</p>
            </div>

            <table className="searchResultTable-table table-striped table-hover">
              <thead className="searchResultTable-table-head">
                <tr>
                  <th scope="col">Hash</th>
                  <th scope="col">Confirmations</th>
                  <th scope="col">Value (Eth)</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Gas (Wei)</th>
                </tr>
              </thead>
              <tbody>
                {
                  // Insert table rows that were dynamically generated above
                  searchResultTableRows
                }
              </tbody>
            </table>
          </div> // If empty, dispplay a friendly message
        : <div>
            <br></br>
            <h3>No Transactions found</h3>
          </div>
    );
  }
}

SearchResultsTable.propTypes = {
  searchResults: PropTypes.array.isRequired,
  ethAddress: PropTypes.string.isRequired,
};

export default SearchResultsTable;
