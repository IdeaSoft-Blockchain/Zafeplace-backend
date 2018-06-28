const {Router} = require('express');
const {checkToken} = require('app/controllers/session');
const {checkAppToken} = require('app/controllers/application');
const {application} = require('app/controllers');
const router = Router();
const multer = require('config/multer');

router.post('/app/create', checkToken, multer.single('logo'), application.createApp);

router.get('/app/session/login', application.login);

router.get('/app/:network/account/balance', checkAppToken, application.getAccountBalance);

router.get('/app/:network/account/token-balance', checkAppToken, application.getAccountTokenBalance);

router.get('/app/:network/account/native-coin/rawtx', checkAppToken, application.getNativeCoinRawTransaction);

router.get('/app/:network/account/token-transfer/rawtx', checkAppToken, application.getTokenRawTransaction);

router.post('/app/:network/account/send-tx', checkAppToken, application.sendTransaction);

router.get('/app/:network/contract/abi', checkAppToken, application.getMethodsOfContract);

router.post('/app/:network/contract/execute-method', checkAppToken, application.executeMethodOfContract);

module.exports = router;