Fullstack Etherscan App
===============


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

## Deploy on Server

## Misc.
### Clean up unsused Docker containers to free disk space
Warning: these command will delete ALL Docker containers and images

* Delete all containers
```
docker rm $(docker ps -a -q)
```
* Delete all images
```
docker rmi $(docker images -q)
```

### Other useful Docker Commands

* Get running containers
```
docker ps
```

* Go inside running container to inspect
```
docker exec -i -t containerID /bin/sh
```

/etc/init.d/apache2 stop