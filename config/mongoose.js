const mongoose = require('mongoose');
const {db: {link}} = require('config');

mongoose.Promise = require('bluebird').config({longStackTraces: false, warnings: false});

mongoose.connect(link);

module.exports = mongoose;