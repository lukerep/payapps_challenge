const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

const adapter = new FileSync('data/data.json');
const db = low(adapter);

// Sets up database with some entry/s if the database file does not exist yet
db.defaults({
	contracts: [
		{
			id: uuidv4(),
			state: 'DRAFT', // using a string to determine if DRAFT or ACTIVE instead of bool, incase we want additional states in the future
			header: {
				name: 'Luke',
				address: 'Melbourne'
			},
			lines: [
				{ text: 'Line 1', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 2', originalValue: 1000, currentValue: 2000 },
			]
		}
	]
}).write();

const searchContracts = (req, res) => {
	// Matching for a provided 'name' field and an 'address' field within the header field (case insensitive)
	const data = db.get('contracts').filter(({header}) => {
		return (req.body.name ? header.name.toLowerCase().includes(req.body.name.toLowerCase()) : true) &&
		(req.body.address ? header.address.toLowerCase().includes(req.body.address.toLowerCase()) : true)
	}).value();

	return res.send(data);
};

const getContract = (req, res) => {
	const id = req.params.id;
	const data = db.get('contracts').find({id}).value();

	return data ? res.send(data) : res.sendStatus(404);
};

const putContract = (req, res) => {
	const id = req.params.id;

	return res.send(id);
};

const postContract = (req, res) => {
	const id = req.params.id;

	return res.send(id);
};

const deleteContract = (req, res) => {
	const id = req.params.id;

	return res.send(id);
};

module.exports = {
	searchContracts,
	getContract,
	putContract,
	postContract,
	deleteContract
};