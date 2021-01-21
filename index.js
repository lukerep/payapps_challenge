const express = require('express');
const helmet = require('helmet'); // Helmet for API security
const morgan = require('morgan'); // Morgan for API logging
const bodyParser = require('body-parser'); // To help handling incoming JSON data

const dataHandler = require('./dataHandler/dataHandlerWrapper');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());

// Route for handling an individual contract
app.route('/contract/:id?')
	.get(dataHandler.getContract)
	.put(dataHandler.putContract)
	.post(dataHandler.postContract)
	.delete(dataHandler.deleteContract);

// Route for handling multiple contracts
app.route('/contracts')
	.get(dataHandler.searchContracts);

// Route for handling an individual claim
app.route('/claim/:id?')
	.get(dataHandler.getClaim)
	.put(dataHandler.putClaim)
	.post(dataHandler.postClaim)
	.delete(dataHandler.deleteClaim);

// Route for hanlding multiple claims
app.route('/claims')
	.get(dataHandler.searchClaims);

// Run our app on the process.env.PORT if provided, otherwise use port 3000
const portNum = process.env.PORT || 3000;
app.listen(portNum, () =>
	console.log(`Payapps Challenge listening on port ${portNum}!`),
);