const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('libs/logger');

// initialize database
require('db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('cors')());

// logger
app.use(logger);

// initialize routes
fs.readdirSync('app/routes')
    .forEach(file =>
        app.use('/', require(`app/routes/${file}`)));

module.exports = app;
