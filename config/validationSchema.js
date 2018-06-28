const {
    firstName,
    lastName,
    email,
    country,
    company,
    password,
    passwordRepeat,
    token,
    authToken,
    name,
    description,
    packageName,
    appId,
    developerETHWallet,
    appCoverGasUsage,
    webHookData,
    fcmData,
    bundleId,
    smartContractData,
    appSecret,
    network,
    address,
    amount,
    gasLimit,
    gasPrice,
    signTx,
    recipient,
    sender,
    methodName,
    methodParams,
    senderContract
} = require('config/validationParams');

module.exports = {
    session: {
        signup: [
            firstName,
            lastName,
            email,
            country,
            company,
            password,
            passwordRepeat
        ],
        confirmEmail: [
            token
        ],
        login: [
            email,
            password
        ],
        refreshToken: [
            token
        ],
        logout: [
            authToken
        ],
        forgotPassword: [
            email
        ],
        passwordReset: [
            password
        ],
        checkToken: [
            authToken
        ]
    },
    application: {
        createApp: [
            name,
            description,
            packageName,
            developerETHWallet,
            appCoverGasUsage,
            webHookData,
            fcmData,
            bundleId,
            smartContractData.abi,
            smartContractData.address
        ],
        login: [
            appId,
            appSecret
        ],
        getAccountBalance: [
            address,
            network
        ],
        getAccountTokenBalance: [
            address,
            network
        ],
        checkAppToken: [
            authToken
        ],
        getNativeCoinRawTransaction:[
            network,
            sender,
            recipient,
            amount,
            gasLimit,
            gasPrice
        ],
        sendTransaction:[
            signTx
        ],
        getTokenRawTransaction:[
            network,
            sender,
            recipient,
            amount,
            gasLimit,
            gasPrice
        ],
        getMethodsOfContract:[
            network
        ],
        executeMethodOfContract:[
            network,
            senderContract,
            methodName,
            methodParams,
            gasLimit,
            gasPrice
        ]
    }
};