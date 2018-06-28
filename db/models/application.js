const mongoose = require('mongoose');
const {createAppSecret, setLogo, logo, checkAppSecret, createAppId} = require('db/models_methods/application')

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    appId: {
        type: String,
        default: createAppId
    },

    packageName: {
        type: String
    },
    bundleId: {
        type: String
    },
    developerETHWallet: {
        type: String
    },
    appSecret: {
        type: String,
        default: createAppSecret
    },
    appCoverGasUsage: {
        type: Boolean,
        default: false
    },
    webHookData: {
        type: Array
    },
    fcmData: {
        packageName: String,
        serverApiKey: String
    },
    apnData: {
        bundleId: String
    },
    cryptocurrencies: {
        ethereum: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ethereum'
        },
        stellar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stellar'
        }
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    storage: {type: String, default: 'google'},
}, {
    timestamps: true,
    ensureIndex: true
});

applicationSchema.virtual('logo').set(setLogo);

applicationSchema.methods.checkAppSecret = checkAppSecret;

module.exports = mongoose.model('Application', applicationSchema);