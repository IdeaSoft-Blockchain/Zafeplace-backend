const {Application, Ethereum/*, Transaction*/, Stellar} = require('db');
const tokenHelper = require('libs/tokenHelper');
const passport = require('libs/passport');
const {errorGenerator, throwError} = require('libs/error');
const currency = require('services/cryptocurrencyService.js')();
const {checkKeyInObj, checkValueInArrayOfObj, getObjectFromArrayOnKey} = require('libs/helpers.js');

exports.checkAppToken = (req, res, next) => tokenHelper
    .authApp(req.get('Authorization'), req.params.network)
    .then(app => {
        req.app = app;
        next()
    })
    .catch(err => next(errorGenerator(err)));

/**
 *
 * @swagger
 * /app/create:
 *   post:
 *     tags: ['Application']
 *     description: Create application
 *     summary: Create application
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     security:
 *       - JWTSite: []
 *     parameters:
 *       - name: logo
 *         in: formData
 *         description: The uploaded picture data
 *         required: true
 *         type: file
 *       - name: name
 *         in: formData
 *         type: string
 *         required: true
 *         description: name
 *         example: 'Zafeplace'
 *       - name: description
 *         in: formData
 *         type: string
 *         required: true
 *         description: description
 *         example: 'Zafeplace App'
 *       - name: packageName
 *         in: formData
 *         type: string
 *         required: true
 *         description: packageName
 *         example: 'com.zafeplace.sample'
 *       - name: bundleId
 *         in: formData
 *         type: string
 *         required: true
 *         description: bundleId
 *         example: '1253asxa48975931406'
 *       - name: developerETHWallet
 *         in: formData
 *         type: string
 *         required: true
 *         description: developerETHWallet
 *         example: '0x5521a68D4F8253fC44BFb1490249369b3E285A4A'
 *       - name: stellarAssetIssuer
 *         in: formData
 *         type: string
 *         required: false
 *         description: stellarAssetIssuer
 *         example: 'GDVZL4EROYTRF25LH6J4NRTFTRYXI53QD73L7RVWMT5UVWV3CJXDUNQG'
 *       - name: stellarAssetCode
 *         in: formData
 *         type: string
 *         required: false
 *         description: stellarAssetCode
 *         example: 'ZPL'
 *       - name: appCoverGasUsage
 *         in: formData
 *         type: string
 *         description: appCoverGasUsage
 *         example: 'true'
 *       - name: webHookData
 *         in: formData
 *         type: string
 *         example: '[{"url": "https://zafeplace.com", "identifier": "1"}, {"url": "https://zafeplace.com", "identifier": "1"}]'
 *         description: webHookData
 *       - name: fcmData[packageName]
 *         in: formData
 *         type: string
 *         description: fcmData.packageName
 *         example: 'fvfvsdf'
 *       - name: fcmData[apiKey]
 *         in: formData
 *         type: string
 *         description: fcmData.apiKey
 *         example: '125348975931406'
 *       - name: smartContractData[address]
 *         in: formData
 *         type: string
 *         description: smartContractData.address
 *         example: '0x5521a68D4F8253fC44BFb1490249369b3E285A4A'
 *       - name: smartContractData[abi]
 *         in: formData
 *         type: string
 *         description: smartContractData.abi
 *         example: '[{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receivers","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"sendInitialTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"token","type":"uint256"}],"name":"sendTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"_initialDistribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'
 *
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postApplicationResponseBody'
 */

exports.createApp = (req) => {
    const {
        name,
        description,
        packageName,
        developerETHWallet,
        appCoverGasUsage,
        fcmData,
        bundleId,
        stellarAssetIssuer,
        stellarAssetCode
    } = req.body;
    const {user} = req;
    const logo = req.file;

    return Application.findOne().or([{bundleId}, {packageName}])
        .then(app => {
            if (app) return Promise.reject(450012);

            let {smartContractData, webHookData} = req.body;

            smartContractData.abi = JSON.parse(smartContractData.abi);
            webHookData = JSON.parse(webHookData);

            const smartContract = new Ethereum({smartContractData});
            const stellar = new Stellar({assetCode: stellarAssetCode, assetIssuer: stellarAssetIssuer});
            const application = new Application(Object.assign({
                name,
                description,
                packageName,
                developerETHWallet,
                appCoverGasUsage,
                webHookData,
                fcmData,
                bundleId,
                logo
            }, {
                cryptocurrencies: {
                    ethereum: smartContract._id,
                    stellar: stellar._id
                }
            }));

            user.applications.push(application._id);

            return Promise.all([
                user.save(),
                smartContract
                    .set({application})
                    .save(),
                stellar
                    .set({application})
                    .save(),
                application
                    .set({developer: user})
                    .save()
            ])
                .then(result => ({appId: result[3].appId, appSecret: result[3].appSecret}))
                .catch(err => err)
        })
        .catch(err => Promise.reject(errorGenerator(err)))
};

/**
 *  @swagger
 * /app/session/login:
 *   get:
 *     tags: ['SDK']
 *     description: Getting access token
 *     summary: Getting access token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: appId
 *         type: string
 *         description: appId for getting access token
 *         required: true
 *         example: 'com.zafeplace.sample'
 *       - in: query
 *         name: appSecret
 *         type: string
 *         description: appSecret for getting access token
 *         required: true
 *         example: '7340355aafc8e2aa05ec99c8fccac97e'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getLoginApplicationResponseBody'
 */

exports.login = (req, res, next) => passport
    .loginApp(req, res, next)
    .then(foundApp => tokenHelper.createAccessAppToken(foundApp))
    .then(token => ({accessToken: token}))
    .catch(err => Promise.reject(errorGenerator(err)));

/**
 * @swagger
 * /app/{network}/account/balance:
 *   get:
 *     tags: ['SDK']
 *     description: Get balance
 *     summary: Get balance
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *       - in: query
 *         name: address
 *         type: string
 *         description: wallet address
 *         required: true
 *         example: '0xb7A66BEf08DA07a78c8a8284B873f976967D4052'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getAccountBalanceApplicationResponseBody'
 */

exports.getAccountBalance = (req) => {
    const {params: {network}, query: {address}} = req;
    if (!checkKeyInObj(currency, network)) return throwError(403003);

    return currency[network]
        .getBalance(address)
        .then(balance => ({network, constant: true, result: balance}))
        .catch(err => throwError(err));
};

/**
 * @swagger
 * /app/{network}/account/token-balance:
 *   get:
 *     tags: ['SDK']
 *     description: Get token balance
 *     summary: Get token balance
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *       - in: query
 *         name: address
 *         type: string
 *         description: wallet address
 *         required: true
 *         example: '0xb7A66BEf08DA07a78c8a8284B873f976967D4052'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getAccountBalanceApplicationResponseBody'
 */

exports.getAccountTokenBalance = (req) => {
    const {params: {network}, query: {address}, app: {cryptocurrencies}} = req;
    if (!checkKeyInObj(currency, network) && checkKeyInObj(cryptocurrencies, network)) return throwError(403003);

    return currency[network]
        .getTokenBalance(address, cryptocurrencies[network])
        .then(balance => ({network, constant: true, result: balance}))
        .catch(err => throwError(err));
};

/**
 * @swagger
 * /app/{network}/account/native-coin/rawtx:
 *   get:
 *     tags: ['SDK']
 *     description: Get transaction raw
 *     summary: Get transaction raw
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *       - in: query
 *         name: sender
 *         type: string
 *         description: sender address
 *         required: true
 *         example: '0xb7A66BEf08DA07a78c8a8284B873f976967D4052'
 *       - in: query
 *         name: recipient
 *         type: string
 *         description: recipient address
 *         required: true
 *         example: '0x41B964C9E439d5d5e06c30BA24DC3F9A53844C9A'
 *       - in: query
 *         name: amount
 *         type: number
 *         description: amount
 *         required: true
 *         example: 0.1
 *       - in: query
 *         name: gasLimit
 *         type: number
 *         description: gasLimit
 *         example: 21000
 *       - in: query
 *         name: gasPrice
 *         type: number
 *         description: gasPrice
 *         example: 20
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getNativeCoinRawTransactionResponseBody'
 */

exports.getNativeCoinRawTransaction = (req) => {
    const {params: {network}, query: {sender, recipient, amount, gasLimit, gasPrice}} = req;
    if (!checkKeyInObj(currency, network)) return throwError(403003);

    return currency[network]
        .getNativeCoinRawTransaction(sender, recipient, amount, gasLimit, gasPrice)
        .then(rawTx => ({network, constant: false, result: {sender, recipient, rawTx}}))
        .catch(err => ({message: err.message, errorCode: err.errorCode}));
};

/**
 * @swagger
 * /app/{network}/account/send-tx:
 *   post:
 *     tags: ['SDK']
 *     description: Post transaction
 *     summary: Post transaction raw
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           properties:
 *             signTx:
 *               type: string
 *               example: '0xf867801482520894d0d8d1045413a31b164ac965fca42f4be1ae536088016345785d8a0000802aa02036a9a07c8d58a3070d981cb575c6d4943bf1228a84ef2fc615ceb04ff76b64a07f302de183b0aa7be7add4b2f5d2eb55a79a7bf6156c07878c420ba5d645dab0'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getNativeCoinRawTransactionResponseBody'
 */

exports.sendTransaction = (req) => {
    const {params: {network}, body: {signTx}} = req;
    if (!checkKeyInObj(currency, network)) return throwError(403003);

    return currency[network]
        .sendTransaction(signTx)
        .then(txHash => ({txHash}))
        .catch(err => ({message: err.message, errorCode: err.errorCode}));
};

/**
 * @swagger
 * /app/{network}/account/token-transfer/rawtx:
 *   get:
 *     tags: ['SDK']
 *     description: Get transaction raw
 *     summary: Get transaction raw
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *       - in: query
 *         name: sender
 *         type: string
 *         description: sender address
 *         required: true
 *         example: '0x41B964C9E439d5d5e06c30BA24DC3F9A53844C9A'
 *       - in: query
 *         name: recipient
 *         type: string
 *         description: recipient address
 *         required: true
 *         example: '0xb7A66BEf08DA07a78c8a8284B873f976967D4052'
 *       - in: query
 *         name: amount
 *         type: number
 *         description: amount
 *         required: true
 *         example: 10000
 *       - in: query
 *         name: gasLimit
 *         type: number
 *         description: gasLimit
 *         example: 3000000
 *       - in: query
 *         name: gasPrice
 *         type: number
 *         description: gasPrice
 *         example: 20000
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getNativeCoinRawTransactionResponseBody'
 */

exports.getTokenRawTransaction = (req) => {
    const {params: {network}, query: {sender, recipient, amount, gasLimit, gasPrice}, app: {cryptocurrencies}} = req;
    if (!(checkKeyInObj(currency, network) && checkKeyInObj(cryptocurrencies, network))) return throwError(403003);

    return currency[network]
        .getTokenRawTransaction(sender, recipient, amount, gasLimit, gasPrice, cryptocurrencies[network])
        .then(rawTx => ({network, constant: false, result: {sender, recipient, rawTx}}))
        .catch(err => ({message: err.message, errorCode: err.errorCode}));
};

/**
 * @swagger
 * /app/{network}/contract/abi:
 *   get:
 *     tags: ['SDK']
 *     description: Get transaction raw
 *     summary: Get contract abi
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getMethodsOfContractResponseBody'
 */

exports.getMethodsOfContract = (req) => {
    const {params: {network}, app: {cryptocurrencies}} = req;

    if (!(checkKeyInObj(currency, network)
        && checkKeyInObj(cryptocurrencies, network)
        && checkKeyInObj(cryptocurrencies[network].smartContractData, 'abi')
        && checkKeyInObj(cryptocurrencies[network].smartContractData, 'address'))) return throwError(403003);

    return ({network, constant: true, result: currency[network].getMethodsOfContract(cryptocurrencies[network])})
};

/**
 * @swagger
 * /app/{network}/contract/execute-method:
 *   post:
 *     tags: ['SDK']
 *     description:
 *     summary: Execute contract method
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTApp: []
 *     parameters:
 *       - in: path
 *         name: network
 *         type: string
 *         description: network name
 *         required: true
 *         example: 'ethereum'
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/executeMethodOfContractRequestBody'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/executeMethodOfContractResponseBody'
 */

exports.executeMethodOfContract = (req) => {
    const {params: {network}, app: {cryptocurrencies}, body: {methodName, sender}} = req;
    const abi = cryptocurrencies[network].smartContractData.abi;
    const method = getObjectFromArrayOnKey(abi, 'name', methodName);

    if (!(checkKeyInObj(currency, network)
        && checkKeyInObj(cryptocurrencies, network)
        && checkValueInArrayOfObj(abi, 'name', methodName)
        && method.type === 'function')) return throwError(403003);

    return currency[network]
        .executeMethodOfContract(method, req.body, cryptocurrencies[network])
        .then(result => ({network, ...result}))
        .catch(err => ({message: err.message, errorCode: err.errorCode}));
};
