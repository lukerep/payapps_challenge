const dataCreator = require('../../dataHandler/dataCreator');

describe('dataCreator testing', () => {
	test('createContract with no lines', () => {
		expect.assertions(6);
		// Sample incoming contract data
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia'
		};

		// Creating the contract
		const contract = dataCreator.createContract(contractData);

		// Confirming returned results
		expect(typeof contract.id).toBe('string');
		expect(contract.state).toBe('DRAFT');
		expect(contract.header.name).toBe(contractData.name);
		expect(contract.header.address).toBe(contractData.address);
		expect(Array.isArray(contract.lines)).toBe(true);
		expect(contract.lines.length).toBe(0);
	});

	test('createContract with lines', () => {
		expect.assertions(6);
		// Sample incoming contract data
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		// Creating the contract
		const contract = dataCreator.createContract(contractData);

		// Confirming returned results
		expect(typeof contract.id).toBe('string');
		expect(contract.state).toBe('DRAFT');
		expect(contract.header.name).toBe(contractData.name);
		expect(contract.header.address).toBe(contractData.address);
		expect(Array.isArray(contract.lines)).toBe(true);
		expect(contract.lines.length).toBe(2);
	});

	test('createContract with invalid or missing data', () => {
		expect.assertions(1);
		// Sample incoming contract data (missing address)
		const contractData = {
			name: 'Luke',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		// Try creating the contract and expect it to throw
		try {
			dataCreator.createContract(contractData);
		} catch {
			expect(true).toBe(true);
		}
	});

	test('createClaim with valid data', () => {
		expect.assertions(6);
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		const claimData = {
			respondent: 'Luke',
			claimant: 'Jeff',
			lines: [
				{ lineIndex: 0, claimAmount: 500 },
				{ lineIndex: 1, claimAmount: 1000 }
			]
		};

		// Creating a contract, then forcing it to be ACTIVE so we can setup the claim
		const contract = dataCreator.createContract(contractData);
		contract.state = 'ACTIVE';

		// Creating the claim with the claim data and the newly created contract
		const claim = dataCreator.createClaim(claimData, contract);

		// Confirming returned results
		expect(typeof claim.id).toBe('string');
		expect(claim.contractId).toBe(contract.id);
		expect(claim.state).toBe('DRAFT');
		expect(claim.respondent).toBe(claimData.respondent);
		expect(claim.claimant).toBe(claimData.claimant);
		expect(claim.lines.length).toBe(claimData.lines.length);
	});

	test('createClaim with a non ACTIVE contract', () => {
		expect.assertions(2);
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		const claimData = {
			respondent: 'Luke',
			claimant: 'Jeff',
			lines: [
				{ lineIndex: 0, claimAmount: 500 },
				{ lineIndex: 1, claimAmount: 1000 }
			]
		};

		// Create a contract with the contract data, it should be non ACTIVE
		const contract = dataCreator.createContract(contractData);
		expect(contract.state).not.toBe('ACTIVE');

		// Then try to create a claim on this contract, expect it to throw
		try {
			dataCreator.createClaim(claimData, contract);
		} catch {
			expect(true).toBe(true);
		}
	});

	test('createClaim with missing claim lines', () => {
		expect.assertions(1);
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		const claimData = {
			respondent: 'Luke',
			claimant: 'Jeff',
			lines: []
		};

		// Create a contract with the contract data, it should be non ACTIVE
		const contract = dataCreator.createContract(contractData);
		contract.state = 'ACTIVE';

		// Then try to create a claim on this contract, expect it to throw
		try {
			dataCreator.createClaim(claimData, contract);
		} catch {
			expect(true).toBe(true);
		}
	});

	test('createClaim with mismatched claim lines', () => {
		expect.assertions(1);
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		const claimData = {
			respondent: 'Luke',
			claimant: 'Jeff',
			lines: [
				{ lineIndex: 0, claimAmount: 500 },
				{ lineIndex: 2, claimAmount: 1000 }
			]
		};

		// Create a contract with the contract data, it should be non ACTIVE
		const contract = dataCreator.createContract(contractData);
		contract.state = 'ACTIVE';

		// Then try to create a claim on this contract, expect it to throw
		try {
			dataCreator.createClaim(claimData, contract);
		} catch {
			expect(true).toBe(true);
		}
	});

	test('createClaim with out of range claim amounts', () => {
		expect.assertions(1);
		const contractData = {
			name: 'Luke',
			address: '123 Qwerty Road, Australia',
			lines: [
				{ text: 'Line 0', originalValue: 1000, currentValue: 1000 },
				{ text: 'Line 1', originalValue: 2000, currentValue: 2000 },
			]
		};

		const claimData = {
			respondent: 'Luke',
			claimant: 'Jeff',
			lines: [
				{ lineIndex: 0, claimAmount: 99999 },
				{ lineIndex: 1, claimAmount: 1000 }
			]
		};

		// Create a contract with the contract data, it should be non ACTIVE
		const contract = dataCreator.createContract(contractData);
		contract.state = 'ACTIVE';

		// Then try to create a claim on this contract, expect it to throw
		try {
			dataCreator.createClaim(claimData, contract);
		} catch {
			expect(true).toBe(true);
		}
	});
});
