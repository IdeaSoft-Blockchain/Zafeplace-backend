const Web3 = require('web3');
const {ethereum, ethereum: {networks}} = require('config');
let networkUrl = networks.mainnet;

if (ethereum.ETHER_NETWORK && networks[ethereum.ETHER_NETWORK]) {
    networkUrl = networks[ethereum.ETHER_NETWORK]
}

const web3 = new Web3(
    new Web3.providers.HttpProvider(networkUrl)
);

module.exports = web3;