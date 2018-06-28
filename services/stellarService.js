const StellarSdk = require('stellar-sdk');
const server = require('config/stellar');
const {throwValidateError} = require('libs/error');
const {isAddress} = require('libs/stellarHelper');
const {getObjectFromArrayOnKey, getObjectsFromArrayWithoutThisOnKey} = require('libs/helpers');

exports.getBalance = (address) => !isAddress(address)
    ? throwValidateError(417084, 'address')
    : server
        .loadAccount(address)
        .then(account => getObjectFromArrayOnKey(account.balances, 'asset_type', "native").balance)


exports.getTokenBalance = (address) => !isAddress(address)
    ? throwValidateError(417084, 'address')
    : server
        .loadAccount(address)
        .then(account => getObjectsFromArrayWithoutThisOnKey(account.balances, 'asset_type', "native")
            .map(result => ({balance: result.balance, asset_type: result.asset_type})));

exports.getNativeCoinRawTransaction = async (sender, recipient, amount) => {
    if (!isAddress(sender) || !isAddress(recipient)) throwValidateError(417084, 'address');

    try {
        const account = await server.loadAccount(sender);
        const transaction = new StellarSdk
            .TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: recipient,
                asset: StellarSdk.Asset.native(),
                amount: amount
            }))
            .build();

        const decodedTransaction = transaction.toEnvelope().toXDR().toString('base64');

        return {constant: false, result: {rawTx: decodedTransaction}};
    } catch (err) {
        return Promise.reject(err)
    }
};

exports.sendTransaction = async (signTx) => {
    try {
        const transaction = new StellarSdk.Transaction(signTx);
        const submitTransaction = await server.submitTransaction(transaction);

        return submitTransaction.hash
    } catch (err) {
        return Promise.reject(err)
    }
};

exports.getTokenRawTransaction = async (sender, recipient, amount, gasLimitUser, gasPriceUser, stellar) => {
    if (!isAddress(sender) || !isAddress(recipient)) throwValidateError(417084, 'address');

    const {assetCode, assetIssuer} = stellar;

    if(typeof assetCode === 'undefined' && typeof assetIssuer === 'undefined') {
        throwValidateError(500002, 'assetIssuer or assetCode')
    }

    try {
        const account = await server.loadAccount(sender);
        const transaction = new StellarSdk
            .TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: recipient,
                asset: new StellarSdk.Asset(assetCode, assetIssuer),
                amount: amount
            }))
            .build();

        const decodedTransaction = transaction.toEnvelope().toXDR().toString('base64');

        return {constant: false, result: {rawTx: decodedTransaction}};
    } catch (err) {
        return Promise.reject(err)
    }
};