const {onError, healthCheck, onListening} = require('libs/server');
/**
 * Environment variables
 */
require('dotenv').config();
const env = require('config');
/**
 * Module dependencies
 */
const http = require('http');
const app = require('app');

/**
* Passport schema
* */
require('config/passport')();

/**
 * Health check rout
 */
app.get('/check', healthCheck);
/**
 * Store port from environment in Express.
 */
const port = require('normalize-port')(env.port || '3000');
app.set('port', port);
/**
 * initialize swagger documentation
 */
app.use('/swagger', require('config/swagger'))

/**
 * catch 404 and forward to error handler
 */

const {nextError, errorHandler} = require('libs/error');
app.use(nextError.bind(null, 404000));
/**
 * error handler
 */
app.use(errorHandler);
/**
 * Create https server
 */
const server = http.createServer(app);
app.listen(port);
/**
 * Listen provided port
 */
server.on('error', onError);
server.on('listening', onListening);
/**
 * initial logging
 */
const info = {
    port: env.port,
    environment: process.env.NODE_ENV,
    database: env.db.link
};
console.log(`\nZafeplace application is started!\n Info: ${JSON.stringify(info, null, 6)}\n `);