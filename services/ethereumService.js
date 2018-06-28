const web3 = require('config/web3');
const Tx = require('ethereumjs-tx');
const {throwValidateError} = require('libs/error');
const {toHex, isAddress} = require('libs/web3Helper');
const errors = require('config/errors');

const contractTypes = {
    int: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417067, params.name),
    int8: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417068, params.name),
    int16: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417069, params.name),
    int32: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417070, params.name),
    int64: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417071, params.name),
    int128: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417072, params.name),
    int256: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417073, params.name),
    uint: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417074, params.name),
    uint8: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417075, params.name),
    uint16: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417076, params.name),
    uint32: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417077, params.name),
    uint64: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417078, params.name),
    uint128: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417079, params.name),
    uint256: (params) => !isNaN(params.value) ? toHex(params.value) : throwValidateError(417080, params.name),
    address: (params) => isAddress(params.value) ? params.value : throwValidateError(417081, params.name),
    bool: (params) => typeof params.value === 'boolean' ? params : throwValidateError(417082, params.name),
    string: (params) => typeof params.value === 'string' ? params : throwValidateError(417080, params.name),
};

exports.getBalance = (address) => !isAddress(address)
    ? throwValidateError(417081, 'address')
    : web3
        .eth
        .getBalance(address)
        .then(balance => balance / Math.pow(10, 18));

exports.getTokenBalance = (address, {smartContractData: {abi, address: smartContractAddress}}) => {
    const token = new web3.eth.Contract(abi, smartContractAddress);

    return !isAddress(address)
        ? throwValidateError(417081, 'address')
        : token
            .methods
            .balanceOf(address)
            .call()
            .then(balance => [{balance, asset_type: 'tokens'}])
};

exports.getNativeCoinRawTransaction = async (sender, recipient, amount, gasLimitUser, gasPriceUser) => {
    if (!isAddress(sender) || !isAddress(recipient)) throwValidateError(417081, 'address');

    const senderAddress = sender;
    const recipientAddress = recipient;
    const sendAmount = amount * Math.pow(10, 18);

    try {
        const senderCount = await web3.eth.getTransactionCount(senderAddress);
        const chainId = await web3.eth.net.getId();

        const gasLimit = !(typeof gasLimitUser !== 'undefined'
            && !isNaN(+gasLimitUser)
            && gasLimitUser > 0)
            ? 300000
            : gasLimitUser;

        const gasPrice = !(typeof gasPriceUser !== 'undefined'
            && !isNaN(+gasPriceUser)
            && gasPriceUser > 0)
            ? await web3.eth.getGasPrice()
            : gasPriceUser;

        const rawTransaction = {
            "from": senderAddress,
            "nonce": senderCount,
            "gasPrice": gasPrice,
            "gasLimit": gasLimit,
            "to": recipientAddress,
            "value": sendAmount,
            "chainId": chainId
        };
        //test
        // const privKey = new Buffer('86e8f463036b2e506c663d968e41a16b07b041ae5436cee227e5b57c8af04fbd', 'hex');
        // const tx = new Tx(rawTransaction);
        // tx.sign(privKey);
        // const serializedTx = tx.serialize();
        // console.log('ss', '0x' + serializedTx.toString('hex'))
        //
        return {constant: false, result: rawTransaction};
    } catch (err) {
        return Promise.reject(err)
    }
};

exports.sendTransaction = async (signTx) => {
    try {
        const transaction = await web3.eth.sendSignedTransaction(signTx);
        return transaction.transactionHash;
    } catch (err) {
        return Promise.reject(err)
    }
};

exports.getTokenRawTransaction = async (sender, recipient, amount, gasLimitUser, gasPriceUser, {smartContractData}) => {
    if (!isAddress(sender) || !isAddress(recipient)) throwValidateError(417081, 'address');

    const contractAddress = smartContractData.address;
    const contractAbi = smartContractData.abi;
    const senderAddress = sender;
    const contract = new web3.eth.Contract(contractAbi, contractAddress, {from: senderAddress});
    const recipientAddress = recipient;
    const sendAmount = +amount;

    try {
        const senderCount = await web3.eth.getTransactionCount(senderAddress);
        const chainId = await web3.eth.net.getId();

        const gasLimit = !(typeof gasLimitUser !== 'undefined'
            && !isNaN(+gasLimitUser)
            && gasLimitUser > 0)
            ? 3000000
            : gasLimitUser;

        const gasPrice = !(typeof gasPriceUser !== 'undefined'
            && !isNaN(+gasPriceUser)
            && gasPriceUser > 0)
            ? await web3.eth.getGasPrice()
            : gasPriceUser;

        const rawTransaction = {
            "from": senderAddress,
            "nonce": senderCount,
            "gasPrice": gasPrice,
            "gasLimit": gasLimit,
            "to": contractAddress,
            "data": contract.methods.transfer(recipientAddress, web3.utils.toHex(sendAmount)).encodeABI(),
            "value": 0,
            "chainId": chainId
        };

        //test

        // const privKey = new Buffer('df9a7576312e159f57bf886de1d4d898f1bbfdf32d65792621001ee1f3f82242', 'hex');
        // const tx = new Tx(rawTransaction);
        // tx.sign(privKey);
        // const serializedTx = tx.serialize();
        // console.log('ss', '0x' + serializedTx.toString('hex'))
        //

        return {constant: false, result: rawTransaction};
    } catch (err) {
        return Promise.reject(err)
    }
};

exports.getMethodsOfContract = ({smartContractData}) => (smartContractData);

exports.executeMethodOfContract = (method, bodyParams, smartContractData) => {
    bodyParams.methodParams = JSON.parse(bodyParams.methodParams);

    if (method.constant) {
        return executeCallMethod(method, bodyParams, smartContractData)
    } else if (!method.constant) {
        return executeTransactMethod(method, bodyParams, smartContractData)
    } else {
        return Promise.reject('Unknown method type')
    }
};

function validateContractMethodParams(abiParams, resParams) {
    if (!contractTypes.hasOwnProperty(abiParams.type)) return resParams.value;

    return contractTypes[abiParams.type](resParams);
}

const parseParams = (methodParams, result, params) =>
    result.concat(methodParams.map(resParams => {
        if (params.name === resParams.name) {
            return validateContractMethodParams(params, resParams)
        }
    })
        .filter((result) => result));

function getContractMethod(contract, senderAddress, method, methodParams) {
    const arrayOfParam = method.inputs.reduce(parseParams.bind(null, methodParams), []);
    if (arrayOfParam.length !== method.inputs.length) throw new Error('Parameters not valid!');

    return contract.methods[method.name](...arrayOfParam)
}

async function executeTransactMethod(method, {sender, methodParams, gasLimit, gasPrice}, {smartContractData}) {
    const contractAddress = smartContractData.address;
    const contractAbi = smartContractData.abi;
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const senderAddress = sender;

    try {
        const senderCount = await web3.eth.getTransactionCount(senderAddress);
        const chainId = await web3.eth.net.getId();
        const gasLimitUser = !(typeof gasLimit !== 'undefined'
            && !isNaN(+gasLimit)
            && gasLimit > 0)
            ? 3000000
            : gasLimit;

        const gasPriceUser = !(typeof gasPrice !== 'undefined'
            && !isNaN(+gasPrice)
            && gasPrice > 0)
            ? await web3.eth.getGasPrice()
            : gasPrice;

        const rawTransaction = {
            "from": senderAddress,
            "nonce": senderCount,
            "gasPrice": gasPriceUser,
            "gasLimit": gasLimitUser,
            "to": contractAddress,
            "data": getContractMethod(contract, senderAddress, method, methodParams).encodeABI(),
            "value": 0,
            "chainId": chainId
        };

        return {constant: false, result: {sender, rawTx: rawTransaction}};

    } catch (err) {
        return Promise.reject(err)
    }
}

async function executeCallMethod(method, {sender, methodParams, gasLimit, gasPrice}, {smartContractData}) {
    const contractAddress = smartContractData.address;
    const contractAbi = smartContractData.abi;
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    return getContractMethod(contract, sender, method, methodParams)
        .call()
        .then(result => ({constant: true, result}))
}