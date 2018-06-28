const {Developer, Session} = require('db');
const {errorGenerator} = require('libs/error');
const tokenHelper = require('libs/tokenHelper');
const mailer = require('libs/mailer');
const passport = require('libs/passport');

/**
 * @swagger
 * /session/signup:
 *   post:
 *     tags: ['Registration']
 *     description: Sign up
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: sign up request payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/postSignupRequestBody'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postSignupResponseBody'
 */

exports.signup = (req) => {
    const {firstName, lastName, email, company, country, password, passwordRepeat} = req.body;

    return Developer.findOne({email})
        .then(user => new Promise((resolve, reject) => {

            if (user && user.deleted === true) {
                return reject(450004)
            } else if (user && user.verify === false) {
                return reject(450003)
            } else if (user && user.verify === true) {
                return reject(450001)
            } else if (passwordRepeat !== password) {
                return reject(450002)
            } else {
                resolve(Developer.create({firstName, lastName, email, company, country, password}))
            }

        }))
        .then(user => {
            if (user.verify === false) {
                return tokenHelper.createVerifyToken(user)
            }
        })
        .then(result => {
            if (result) {
                mailer.sendConfirmEmail(result.user, result.token)
            }
        })
        .then(() => Promise.resolve({message: 'Confirm registration'}))
        .catch(err => Promise.reject(errorGenerator(err)))
};

/**
 * @swagger
 * /session/confirm-email?token=:
 *   get:
 *     tags: ['Registration']
 *     description: Confirm email
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         type: string
 *         description: token for validations developers
 *         required: true
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY5OGQ2ZjQ4YzQwMzFlZDAzNTNhZTgiLCJpYXQiOjE1MjYzMDQxNjgsImV4cCI6MTUyNzkxNjg3MjcxMH0.H7qoqPSBe79-ebbq4pHrxwUI-_Pojh4oSCbrcFMcvH0
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/getConfirmEmailResponseBody'
 */

exports.confirmEmail = (req) => {
    const {token} = req.query;
    return tokenHelper.confirmVerifyToken(token)
        .then(() => {
            return ({
                message: 'Registration confirmed'
            })
        })
        .catch(err => Promise.reject(errorGenerator(err)))
};

/**
 * @swagger
 * /session/login:
 *   post:
 *     tags: ['Login/Logout']
 *     description: Login
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: sign up request payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/postLoginRequestBody'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postLoginResponseBody'
 */

exports.login = (req, res, next) => {
    let user, tokens;
    return passport.loginUser(req, res, next)
        .then(foundUser => {
            user = foundUser;
            return Promise.all([
                tokenHelper.createAccessToken(foundUser),
                tokenHelper.createRefreshToken(foundUser)])
        })
        .then(data => {
            tokens = {
                userId: user._id,
                accessToken: data[0].token,
                accessTime: data[0].accessTime,
                refreshToken: data[1].token
            };

            return Session.findOneAndUpdate({userId: user._id}, tokens, {
                upsert: true,
                setDefaultsOnInsert: true
            });
        })
        .then(() => {
            delete tokens.userId;
            return tokens
        })
        .catch(err => Promise.reject(errorGenerator(err)));

};

/**
 * @swagger
 * /session/refresh-token?token=:
 *   get:
 *     tags: ['Refresh token']
 *     description: for refresh session token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         type: string
 *         description: token for validations developers
 *         required: true
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWY5OGQ2ZjQ4YzQwMzFlZDAzNTNhZTgiLCJpYXQiOjE1MjYzMDQxNjgsImV4cCI6MTUyNzkxNjg3MjcxMH0.H7qoqPSBe79-ebbq4pHrxwUI-_Pojh4oSCbrcFMcvH0
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postLoginResponseBody'
 */

exports.refreshToken = (req) => {
    const {token} = req.query;
    let session;
    return tokenHelper.authToken(token)
        .then(result => {
            if (!result) {
                return Promise.reject(403002)
            }
            if (result.refreshToken !== token) {
                return Promise.reject(403002)
            } else {
                session = result;

                return Promise.all([
                    tokenHelper.createAccessToken(session),
                    tokenHelper.createRefreshToken(session)
                ])
            }
        })
        .then(date => {
            session.accessToken = date[0].token;
            session.accessTime = date[0].accessTime;
            session.refreshToken = date[1].token;
            return session.save()
        })
        .then(session => {
            return ({
                accessToken: session.accessToken,
                accessTime: session.accessTime,
                refreshToken: session.refreshToken
            })
        })
        .catch(err => Promise.reject(errorGenerator(err)))
};

exports.checkToken = (req, res, next) => {
    return tokenHelper.authToken(req.get('Authorization'))
        .then(session => {
            req.user = session.userId;
            req.token = session.accessToken;
            next()
        })
        .catch(err => next(errorGenerator(err)));
};

/**
 * @swagger
 * /session/forgot-password:
 *   post:
 *     tags: ['Forgot password']
 *     description: Forgot password
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: recover password request payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/postForgotPasswordRequestBody'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postForgotPasswordResponseBody'
 */

exports.forgotPassword = (req) => {
    const {email} = req.body;
    let findUser, newTokens;
    return Developer.findOne({email})
        .then(user => {
            if (!user) return Promise.reject(404000);
            else if (user && user.deleted === true) {
                return Promise.reject(450004)
            } else {
                findUser = user;
                return tokenHelper.createVerifyToken(user)
            }
        })
        .then(result => {
            newTokens = result;
            findUser.status = 1;
            findUser.recoveryToken = result.token;
            return findUser.save()
        })
        .then(result => {
            if (result) mailer.sendRecoverPass(newTokens.user, newTokens.token);
            else return Promise.reject(404000);
        })
        .then(() => {
            return Promise.resolve({
                message: `Password reset message sent successfully!`
            })
        })
        .catch(err => Promise.reject(errorGenerator(err)))
};

/**
 * @swagger
 * /session/reset-password:
 *   post:
 *     tags: ['Forgot password']
 *     description: Reset Password
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: reset password request payload
 *         required: true
 *         schema:
 *           $ref: '#/definitions/postResetPasswordRequestBody'
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postResetPasswordResponseBody'
 */

exports.passwordReset = (req) => {
    const {password, token} = req.body;

    return tokenHelper.confirmRecoverToken(token)
        .then(developer => {
            developer.status = 0;
            developer.recoveryToken = null;
            developer.password = password;
            return developer.save();
        })
        .then(() => {
            return ({
                message: 'The password change is successful!'
            })
        })
        .catch(err => Promise.reject(errorGenerator(err)));
};

/**
 * @swagger
 * /session/logout:
 *   get:
 *     tags: ['Login/Logout']
 *     description: 'Logout'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - JWTSite: []
 *     responses:
 *       200:
 *         description: Response article
 *         schema:
 *           $ref: '#/definitions/postLogoutResponseBody'
 */

exports.logout = (req) =>
    tokenHelper.deleteTokens(req.body.token)
        .then(() => ({result: true}))
        .catch(err => Promise.reject(errorGenerator(err)));