Fullstack Etherscan App
===============


A simple fullstack SSR web app used to search ether transactions by ETH address using Etherscan's API. 

Check out the quick [screencast demo](https://drive.google.com/file/d/1aAgjQI3_VDO_YfYLDcx5fmGh_RYB_oR8/view?usp=sharing).

## Tools Used 
* NextJs
* Koa
* Mongo
* React
* Redux

## Project Structure
```
.
├── controllers
│   ├── balances.js
│   └── transactions.js
├── lib
│   └── with-redux-store.js
├── models
│   ├── balance.js
│   └── transaction.js
├── pages
│   ├── _app.js
│   └── search.js
├── react
│   ├── components
│   ├── redux
│   └── styles
├── routes
│   ├── balances.js
│   ├── index.js
│   └── transactions.js
├── services
│   └── etherscan.js
├── README.md
├── env-template
├── now.json
├── package.json
├── server.js
└── yarn.lock
```

## Installation
* Install Build Dependencies with `npm install`
* Install MongoDB using homebrew
* Create API key for Etherscan
* Create .env file based on env-temnplate w/ Mongo URI and API Key

## Run locally
* `yarn dev` - To run the application for local development, includes livereload
