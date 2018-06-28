const StellarSdk = require('stellar-sdk');
const {stellar, stellar: {networks}} = require('config');

let networkUrl = networks.mainnet;

if (stellar.STELLAR_NETWORK && networks[stellar.STELLAR_NETWORK]) {
    networkUrl = networks[stellar.STELLAR_NETWORK]
}

if (stellar.STELLAR_NETWORK === 'testnet') {
    StellarSdk.Network.useTestNetwork();
} else {
    StellarSdk.Network.usePublicNetwork();
}

const server = new StellarSdk.Server(networkUrl);

module.exports = server;