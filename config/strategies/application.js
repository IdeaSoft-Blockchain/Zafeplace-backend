const CustomStrategy = require('passport-custom').Strategy;
const {Application} = require('db');
const {errorGenerator} = require('libs/error');

module.exports = passport => passport
    .use('application', new CustomStrategy((req, done) =>
        Application.findOne({appId: req.query.appId})
            .then(app => {
                    if (!app) {
                        done(450011, false)
                    } else if (!app.checkAppSecret(req.query.appSecret)) {
                        done(450011, false)
                    } else {
                        done(null, app)
                    }
                }
            )
            .catch(errorGenerator(404000))
    ));
