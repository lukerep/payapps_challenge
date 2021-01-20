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
				{ text: 'Line 1', value: 1000 },
				{ text: 'Line 2', value: 2000 },
			]
		}
	]
}).write();

const getContract = (req, res) => {
	const id = req.params.id;
	return res.send(db.get('contracts').find({ header: {name: id} }).value() || 404);
};

const putContract = (req, res) => {
	const id = req.params.id;
	res.send(id);
};

const postContract = (req, res) => {
	const id = req.params.id;
	res.send(id);
};

const deleteContract = (req, res) => {
	const id = req.params.id;
	res.send(id);
};

module.exports = {
	getContract,
	putContract,
	postContract,
	deleteContract
};