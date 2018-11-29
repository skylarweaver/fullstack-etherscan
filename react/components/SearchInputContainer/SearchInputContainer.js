// Import React Modules
import React, { Component } from 'react';
import { withRouter } from 'next/router';

// Import Scenes
import SearchInput from './SearchInput/SearchInput';

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

// export default withRouter(SearchInputContainer);
export default withRouter(SearchInputContainer);
