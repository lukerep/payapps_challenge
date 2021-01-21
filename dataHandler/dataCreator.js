const { v4: uuidv4 } = require('uuid');

const createContract = (contractData) => {
	// Check that name and address properties were provided.
	if (!contractData.name || !contractData.address) {
		throw new Error('Error: no name or address properties provided.');
	}

	let lines = [];

	if (contractData.lines && Array.isArray(contractData.lines)) {
		lines = contractData.lines;
	}

	return {
		id: uuidv4(), // Give the contract/document a unique id
		state: 'DRAFT', // Default to 'DRAFT'
		header: {
			name: contractData.name,
			address: contractData.address
		},
		lines
	};
};

const createClaim = (claimData, contract) => {
	// Checking that the contract we are referencing is ACTIVE
	if (contract.state !== 'ACTIVE') {
		throw new Error('Error: You cannot create a claim on a contract that is not active.');
	}

	// Checking that we have an array of lines and that it is not empty
	if (!Array.isArray(claimData.lines) || !claimData.lines.length) {
		throw new Error('Error: Provided lines property is invalid or empty.');
	}

	// Going through each line and checking it is valid in reference to the contract
	claimData.lines.forEach((line) => {
		if (line.lineIndex > contract.lines.length - 1) {
			throw new Error(`Error: Your claim for lineIndex: ${line.lineIndex} does not exist in the specified contract.`);
		}
		if (line.claimAmount > contract.lines[line.lineIndex].currentValue) {
			throw new Error(`Error: Your claim amount for lineIndex: ${line.lineIndex} exceeds the current value of that line in the contract.`);
		}
	});

	return {
		id: uuidv4(),
		contractId: contract.id,
		state: 'DRAFT',
		respondent: claimData.respondent,
		claimant: claimData.claimant,
		lines: claimData.lines
	};

};

module.exports = {
	createContract,
	createClaim
};
