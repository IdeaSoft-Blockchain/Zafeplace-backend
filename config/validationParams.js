const {body, query, param, header} = require('express-validator/check');
const {CONST: {PASSWORD_REGEX}} = require('config');
module.exports = {
    firstName: body('firstName')
        .exists()
        .withMessage(417000)
        .isAscii()
        .withMessage(417010)
        .isLength({min: 2, max: 100})
        .withMessage(417020),
    lastName: body('lastName')
        .exists()
        .withMessage(417001)
        .isAscii()
        .withMessage(417011)
        .isLength({min: 2, max: 100})
        .withMessage(417021),
    email: body('email')
        .exists()
        .withMessage(417002)
        .isEmail()
        .withMessage(417012)
        .isLength({min: 6, max: 100})
        .withMessage(417022),
    country: body('country')
        .optional()
        .isString()
        .withMessage(417013)
        .isLength({min: 0, max: 36})
        .withMessage(417023),
    company: body('company')
        .optional()
        .isString()
        .withMessage(417014)
        .isLength({min: 0, max: 100})
        .withMessage(417024),
    password: body('password')
        .exists()
        .withMessage(417005)
        .matches(PASSWORD_REGEX)
        .withMessage(417015),
    passwordRepeat: body('passwordRepeat')
        .exists()
        .withMessage(417004)
        .matches(PASSWORD_REGEX)
        .withMessage(417016),
    token: query('token')
        .exists()
        .withMessage(417005)
        .isAscii()
        .withMessage(417017),
    authToken: header('Authorization')
        .exists()
        .withMessage(417005)
        .isAscii()
        .withMessage(417017),
    name: body('name')
        .exists()
        .withMessage(417006)
        .isAscii()
        .withMessage(417018),
    description: body('description')
        .exists()
        .withMessage(417007)
        .isAscii()
        .withMessage(417019),
    packageName: body('packageName')
        .exists()
        .withMessage(417008)
        .isString()
        .withMessage(417050),
    appId: query('appId')
        .exists()
        .withMessage(417008)
        .isString()
        .withMessage(417050),
    developerETHWallet: body('developerETHWallet')
        .exists()
        .withMessage(417009)
        .isAscii()
        .withMessage(417051),
    appCoverGasUsage: body('appCoverGasUsage')
        .optional()
        .isBoolean()
        .withMessage(417052),
    webHookData: body('webHookData')
        .optional()
        .isString()
        .withMessage(417053),
    fcmData: body('fcmData.*')
        .optional()
        .isString()
        .withMessage(417054),
    appSecret: query('appSecret')
        .optional()
        .isAscii()
        .withMessage(417058),
    bundleId: body('bundleId')
        .optional()
        .isString()
        .withMessage(417055),
    smartContractData: {
        address: body('smartContractData.address')
            .optional()
            .isString()
            .withMessage(417056),
        abi: body('smartContractData.abi')
            .optional()
            .isString()
            .withMessage(417057)
    },
    recipient: query('recipient')
        .exists()
        .withMessage(417111)
        .isAscii()
        .withMessage(417059),
    address: query('address')
        .exists()
        .withMessage(417116)
        .isAscii()
        .withMessage(417066),
    sender: query('sender')
        .exists()
        .withMessage(417115)
        .isAscii()
        .withMessage(417065),
    network: param('network')
        .exists()
        .withMessage(417112)
        .isAscii()
        .withMessage(417060),
    amount: query('amount')
        .exists()
        .withMessage(417113)
        .isFloat()
        .withMessage(417064),
    gasLimit: query('gasLimit')
        .optional()
        .isInt()
        .withMessage(417061),
    gasPrice: query('gasPrice')
        .optional()
        .isInt()
        .withMessage(417062),
    signTx: body('signTx')
        .exists()
        .withMessage(417114)
        .isString()
        .withMessage(417063),
    methodName: body('methodName')
        .exists()
        .withMessage(417118)
        .isString()
        .withMessage(417025),
    methodParams: body('methodParams')
        .exists()
        .withMessage(417119)
        .isString()
        .withMessage(417026),
    senderContract: body('sender')
        .exists()
        .withMessage(417115)
        .isString()
        .withMessage(417065),
};