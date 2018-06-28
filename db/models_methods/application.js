const crypto = require('crypto');
const {getRandomInt} = require('libs/helpers');
const {streamPictureToGCS} = require('libs/gcs');
const {gcs: {appLogoFolder}} = require('config');

exports.createAppId = () => getRandomInt(100000000000000, 999999999999999);

exports.createAppSecret = () => crypto.randomBytes(16).toString('hex');

exports.setLogo = function (file) {
    return streamPictureToGCS(`${appLogoFolder}/${this._id}.jpg`, file)
        .catch(console.log.bind('Fail to stream app logo to gcs'))
};

exports.checkAppSecret = function (appSecret) {
    if (!appSecret) return false;
    return appSecret === this.appSecret;
};