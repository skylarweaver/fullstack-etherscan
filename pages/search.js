import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import SearchInputContainer from '../react/components/SearchInputContainer/SearchInputContainer';
import SearchResults from '../react/components/SearchResults/SearchResults';
// Import styles
import SimpleStyles from '../react/styles/SimpleStyles';

class Index extends React.Component {
  // static getInitialProps({ reduxStore, req }) {
  //   const isServer = !!req;
  //   return {};
  // }

  render() {
    return (
      <div className="search-page">
        <h1 className="search-page-title">Etherscan Search</h1>
        <ul>
          <SearchInputContainer/>
          <SearchResults/>
        </ul>
        <SimpleStyles/>
      </div>
    );
  }
}

export default withRouter(connect()(Index));
