const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');
const dataCreator = require('./dataCreator');

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

const searchContracts = (data) => {
    return db.get('contracts').filter(({header}) => {
		return (data.name ? header.name.toLowerCase().includes(data.name.toLowerCase()) : true) &&
		(data.address ? header.address.toLowerCase().includes(data.address.toLowerCase()) : true)
	}).value();
}

const getContract = (id) => {
    return db.get('contracts').find({id}).value();
}

const putContract = (id, data) => {
    const contract = getContract(id);
    
    // Throw an error if the id provided does not refer to an existing document
    if (!contract) {
        throw new Error('Cannot find contract');
    }

    // Setting the data id to the contract's id so it remains consistent
    data.id = contract.id;

    return db.get('contracts')
        .find({id})
        .assign(data)
        .write();
}

const postContract = (data) => {
	const contract = dataCreator.createContract(data);
    db.get('contracts')
        .push(contract)
        .write();

    return contract;
}

const deleteContract = (id) => {

    return db.get('contracts')
		.remove({id})
		.write();
}

module.exports = {
	searchContracts,
	getContract,
	putContract,
	postContract,
	deleteContract
};