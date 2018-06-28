const web3 = require('config/web3');

module.exports.toHex = (params) => web3.utils.toHex(params);

module.exports.isAddress = (params) => web3.utils.isAddress(params);