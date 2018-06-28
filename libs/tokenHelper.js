const jwt = require('jsonwebtoken');
const {secretKey} = require('config');
const {Developer, Session, Application} = require('db');

module.exports.createVerifyToken = (user) =>
    new Promise(resolve => {
        const {_id, email} = user;
        const payload = {_id, email};
        const token = jwt.sign(payload, secretKey, {expiresIn: '24h'});

        resolve({token, user});
    });

module.exports.confirmVerifyToken = (token) =>
    new Promise((resolve, reject) =>
        jwt.verify(token, secretKey, (err, verifiedJwt) => {
            if (err) {
                return reject(450006)
            } else {
                return Developer.findOne({email: verifiedJwt.email})
                    .then(user => {
                        if (!user) return reject(450006);
                        else if (verifiedJwt.exp <= verifiedJwt.iat) return reject(403000);
                        else if (user.verify) return reject(450007);
                        else {
                            user.verify = true;
                            resolve(user.save())
                        }
                    })
                    .catch(() => {
                        reject(450008)
                    })
            }
        })
    );

module.exports.confirmRecoverToken = (token) =>
    new Promise((resolve, reject) =>
        jwt.verify(token, secretKey, (err, verifiedJwt) => {
            if (err) {
                return reject(450006)
            } else {
                return Developer.findOne({email: verifiedJwt.email})
                    .then(user => {
                        if (!user) return reject(450006);
                        else if (verifiedJwt.exp <= verifiedJwt.iat) return reject(403000);
                        else if (user.status !== 1 || user.recoveryToken !== token) return reject(450006);
                        else {
                            resolve(user)
                        }
                    })
                    .catch(() => {
                        reject(450008)
                    })
            }
        })
    );

module.exports.decodeToken = (token) =>
    new Promise((resolve, reject) =>
        jwt.verify(token, secretKey, (err, decodedJwt) => {
            if (err) {
                reject(450006)
            } else {
                resolve(decodedJwt)
            }
        })
    );

module.exports.createAccessToken = (date) =>
    new Promise(resolve => {
        const payload = {_id: date._id};
        const accessTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        const token = jwt.sign(payload, secretKey, {expiresIn: accessTime});
        resolve({token, accessTime});
    });

module.exports.createRefreshToken = (user) =>
    new Promise(resolve => {
        const payload = {_id: user._id};
        const refreshTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;
        const token = jwt.sign(payload, secretKey, {expiresIn: refreshTime});
        resolve({token});
    });


module.exports.authToken = (token) =>
    new Promise((resolve, reject) =>
        jwt.verify(token, secretKey, (err, decodedJwt) => {
            if (err) {
                reject(450006);
            } else {
                return Session.findOne({userId: decodedJwt._id})
                    .populate('userId')
                    .then(session => {
                        if (!session) return reject(450006);
                        if (decodedJwt.exp <= decodedJwt.iat * 1000) {
                            return reject(403000)
                        }
                        resolve(session)
                    })
                    .catch(() => reject(450006))
            }
        })
    );


module.exports.deleteTokens = (token) =>
    Session.findOneAndRemove({accessToken: token})
        .then(() => Promise.resolve({message: true}))
        .catch(() => Promise.reject(450009));

module.exports.createAccessAppToken = (app) => Promise.resolve(jwt.sign({_id: app._id}, secretKey));


module.exports.authApp = (token, network) =>
    new Promise((resolve, reject) =>
        jwt.verify(token, secretKey, (err, decodedJwt) => {
            if (err) {
                reject(450006);
            } else {
                return Application.findById(decodedJwt._id)
                    .populate(`cryptocurrencies.${network}`)
                    .then(app => {
                        if (!app) return reject(450006);
                        resolve(app)
                    })
                    .catch(() => reject(450006))
            }
        })
    );
