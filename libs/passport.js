const passport = require('passport');

module.exports.loginUser = (req, res, next) =>
    new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (err) reject(err);
            else if (user && user.verify === false) reject(450003);
            else if (user && user.deleted === true) reject(450004);
            else return resolve(user)
        })(req, res, next)
    });

module.exports.loginApp = (req, res, next) =>
    new Promise((resolve, reject) => {
        passport.authenticate('application', (err, app) => {
            if (err) reject(err);
            else if (app && app.deleted === true) reject(450010);
            else return resolve(app)
        })(req, res, next)
    });

