const {isLogging} = require('config')

module.exports = (req, res, next) => isLogging &&
    req.originalUrl !== '/check' &&
    console.log(
        `****************REQUEST******************
        ${req.method} ${req.originalUrl}:
        body: ${JSON.stringify(req.body, null, 2)}
        query: ${JSON.stringify(req.query, null, 2)}
        params: ${JSON.stringify(req.params, null, 2)}
******************************************`) ||
    next()
