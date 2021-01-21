const { v4: uuidv4 } = require('uuid');

const createContract = (data) => {
    let lines = [];

    if (data.lines && Array.isArray(data.lines)) {
        lines = data.lines;
    }

    return {
        id: uuidv4(), // Give the contract/document a unique id
        state: 'DRAFT', // Default to 'DRAFT'
        header: {
            name: data.name,
            address: data.address
        },
        lines
    };
}

const createClaim = () => {
    return {};
}

module.exports = {
    createContract,
    createClaim
}
