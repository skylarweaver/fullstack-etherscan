import React from 'react';

const SimpleStyles = () => (
    <style jsx global>
    {`
      body{
        font-family: 'Helvetica Neue';
        width: 1300px;
        margin: auto;
        text-align: center
      }
      a {

        color: #6097d0;
      }
      a:hover {
        opacity: 0.8;
      }

      .search-page-title {
        font-family: 'Impact';
        font-size: 3em;
        color: #325983;
      }

      .search-results-heading {
        display: flex

      }
      .search-results-heading-content{
        display: flex;
      }
      .current-transaction-heading {
        width: 50%;
        text-align: left;
        font-size: 1.15em;
        margin: 0;
        color: #848484c9;
      }
      .current-transaction {
        width: 50%;
        text-align: left;
        font-size: 1.25em;
        margin: 0;
      }

      .balance {
        width: 50%;
        text-align: right;
        font-size: 1.25em;
        margin: 0;
      }
      .balance-heading {
        width: 50%;
        text-align: right;
        font-size: 1.15em;
        margin: 0;
        color: #848484c9;
      }

      .search-input {
        font-size: 2em;
        height: 3em;
        width: 30em;
        text-align: center;
        border-radius: 5rem 0 0 5rem;
        background-color: #0c0ce514;
        margin: 0 0em 2em 0;
        border: none;
      }

      .search-input-button {
        font-size: 2em;
        height: 3em;
        width: 4em;
        text-align: center;
        border-radius: 0 1rem 1rem 0;
        background-color: #255987;
        color: white;
        border: none;
      }

      .search-input-button-disabled {
        font-size: 2em;
        height: 3em;
        width: 4em;
        text-align: center;
        border-radius: 0 1rem 1rem 0;
        background-color: #2559873d;
        color: white;
        border: none;
      }

      .searchResultTable-table {
        margin: auto;
      }
      .searchResultTable-table-head {
        line-height: 2em;
      }
      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}
  </style>
);

export default SimpleStyles;
