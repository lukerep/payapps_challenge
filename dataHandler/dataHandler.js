const contracts = [
	{
		header: 'Header line',
		lines: [
			{text: 'Line 1', value: 10},
			{text: 'Line 2', value: 20},
		]
	}
];

const getContract = (req, res) => {
	const id = req.params.id;

	if (isNaN(id) || id >= contracts.length) {
		return res.send(404); //404 not found
	}

	return res.send(contracts[id]);
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