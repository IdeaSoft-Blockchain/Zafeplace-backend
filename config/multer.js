const Multer = require('multer');
const {fileUpload: {imageSize}} = require('config');

module.exports = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: imageSize * 1024 * 1024,
    }
});
