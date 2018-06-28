const {readdirSync} = require('fs');

module.exports = () => readdirSync('services')
    .filter(fileName => fileName !== 'cryptocurrencyService.js')
    .reduce((cryptoServiceAccumulator, file) => Object.assign(
        cryptoServiceAccumulator, {
            [file.replace('Service.js', '')]: require(`services/${file}`),
        }
    ), {});