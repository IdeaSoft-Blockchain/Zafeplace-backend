const {Router} = require('express');
const {session} = require('app/controllers');
const {checkToken} = require('app/controllers/session');

const router = Router();

router.post('/session/signup', session.signup);

router.get('/session/confirm-email', session.confirmEmail);

router.post('/session/login', session.login);

router.get('/session/refresh-token', session.refreshToken);

router.post('/session/forgot-password', session.forgotPassword);

router.post('/session/reset-password', session.passwordReset);

router.get('/session/logout', checkToken, session.logout);


module.exports = router;
