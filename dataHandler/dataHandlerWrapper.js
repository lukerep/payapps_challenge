const dataHandler = require('./lowdbDataHandler');

const searchContracts = (req, res) => {
	const data = dataHandler.searchContracts(req.body);

	return res.send(data);
};

const getContract = (req, res) => {
	const id = req.params.id;
	const data = dataHandler.getContract(id);

	// Return the data if available, otherwise return a 404 error (Not found)
	return data ? res.send(data) : res.sendStatus(404);
};

const putContract = (req, res) => {
	const id = req.params.id;

	// Try to update a specific contract with incoming data
	try {
		dataHandler.putContract(id, req.body);
	} catch {
		// If it is unable to locate the contract, return a 404 error (Not found)
		return res.sendStatus(404);
	}

	return res.sendStatus(200);
};

const postContract = (req, res) => {
	// If we are not provided a name and address, return 400 error (Bad request)
	if (!req.body.name || !req.body.address) {
		return res.status(400).send('Error: Missing name or address property');
	}

	// Create a contract
	const data = dataHandler.postContract(req.body);

	// Return the unique generated id along with 201 status (Success Created)
	return res.status(201).send(data.id);
};

const deleteContract = (req, res) => {
	const id = req.params.id;

	// Try to delete the contract
	const data = dataHandler.deleteContract(id);

	// If the resource existed and was deleted, return a 200 error (Success) otherwise a 404 error (Not found)
	return res.sendStatus(data.length ? 200 : 404);
};

const searchClaims = (req, res) => {
	const data = dataHandler.searchClaims(req.body);

	return res.send(data);
}

module.exports = {
	searchContracts,
	getContract,
	putContract,
	postContract,
	deleteContract,
	searchClaims
};