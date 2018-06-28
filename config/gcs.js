const Storage = require('@google-cloud/storage');
const {gcs: {bucketName}} = require('config');
const storage = new Storage();

module.exports = storage.bucket(bucketName);