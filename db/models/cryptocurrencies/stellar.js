const mongoose = require('mongoose');

const Stellar = new mongoose.Schema({
    assetIssuer: {
        type: String
    },
    assetCode: {
        type: String
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }
}, {
    timestamps: true,
    ensureIndex: true
});

module.exports = mongoose.model('Stellar', Stellar);