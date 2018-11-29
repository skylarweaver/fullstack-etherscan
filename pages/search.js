import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import SearchInputContainer from '../react/components/SearchInputContainer/SearchInputContainer';
import SearchResults from '../react/components/SearchResults/SearchResults';

class Index extends React.Component {
  // static getInitialProps({ reduxStore, req }) {
  //   const isServer = !!req;
  //   return {};
  // }

  render() {
    return (
      <div>
        <h1 className="search-title">Etherscan Search</h1>
        <ul>
          <SearchInputContainer/>
          <SearchResults/>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect()(Index));
