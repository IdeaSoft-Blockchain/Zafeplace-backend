const bucket = require('config/gcs');

const imageOptions = {metadata: {contentType: 'image/jpeg'}};

const createFileStream = (path, {buffer}, params, resolve, reject) => bucket
    .file(path)
    .createWriteStream(params)
    .on('error', reject)
    .on('finish', resolve)
    .end(buffer)

exports.streamPictureToGCS = (path, file) => new Promise(createFileStream.bind(null, path, file, imageOptions));

exports.googleStorage = {storage: 'google'};