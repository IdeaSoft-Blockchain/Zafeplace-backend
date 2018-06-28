const fs = require('fs');
const passport = require('passport');
const strategies = fs.readdirSync('config/strategies');

module.exports = () =>
    strategies.forEach(strategy =>
        require(`config/strategies/${strategy}`)(passport));