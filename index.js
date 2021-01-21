const express = require('express');
const helmet = require('helmet'); // Helmet for API security
const morgan = require('morgan'); // Morgan for API logging
const bodyParser = require('body-parser'); // To help handling incoming data

const dataHandler = require('./dataHandler/dataHandler');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());

app.route('/contract/:id')
	.get(dataHandler.getContract)
	.put(dataHandler.putContract)
	.post(dataHandler.postContract)
	.delete(dataHandler.deleteContract);

app.route('/contracts')
	.get(dataHandler.searchContracts);

// app.route('/claim/:id')
// 	.get((req, res) => {

// 	})

app.listen(process.env.PORT || 3000, () =>
	console.log(`Example app listening on port ${process.env.PORT || 3000}!`),
);