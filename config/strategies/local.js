const LocalStrategy = require('passport-local').Strategy;
const {Developer} = require('db');
const {errorGenerator} = require('libs/error');

module.exports = passport => passport
    .use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, (email, password, done) => {
        return Developer.findOne({email: email})
            .then(user => {
                if (!user) {
                    done(450009, false)
                } else if (!user.checkPassword(password)) {
                    done(450009, false)
                } else {
                    done(null, user)
                }
            })
            .catch(errorGenerator(400001))
    }));
