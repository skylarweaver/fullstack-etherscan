import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const SearchInput = ({ handleChange, ethAddress, isBtnDisabled }) => (
  <div >
    <form>
      <input name="ethAddress-input"
        className="search input-large col-6"
        type="text"
        placeholder="Enter ETH Address"
        aria-label="Large"
        onChange={handleChange}
        aria-describedby="inputGroup-sizing-lg"
        maxLength="43"
        minLength="40"
      />
      <Link href={`/search?ethAddress=${ethAddress}`}>
        <button type="submit" className={isBtnDisabled ? '' : ''}>
          Search
        </button>
      </Link>
    </form>
  </div>
);

SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  ethAddress: PropTypes.string.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
  isPresentOnSearchResults: PropTypes.bool,
};

export default SearchInput;
