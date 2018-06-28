const StellarSdk = require('stellar-sdk');

module.exports.isAddress = (params) => StellarSdk.StrKey.isValidEd25519PublicKey(params);