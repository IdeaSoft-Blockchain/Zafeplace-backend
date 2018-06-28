const mongoose = require('mongoose');

const Ethereum = new mongoose.Schema({
    smartContractData: {
        address: {
            type: String
        },
        abi: {
            type: Array
        }
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }
}, {
    timestamps: true,
    ensureIndex: true
});

module.exports = mongoose.model('Ethereum', Ethereum);