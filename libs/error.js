const errors = require('config/errors');

exports.throwError = (err) => Promise.reject(this.errorGenerator(err));

exports.throwValidateError = (errorCode, params) => {
    throw Object.assign(new Error(errors[errorCode](params)), {errorCode})
};

exports.errorGenerator = errorCode => {
    return Object.assign(new Error(errors[errorCode]), {errorCode})
};

exports.nextError = (errorCode, req, res, next) => {
    return next(exports.errorGenerator(errorCode))
};

exports.errorHandler = (err, req, res, next) => {
    if (!err.status && err.errorCode) {
        err.status = parseInt(err.errorCode.toString().substring(0, 3), 10)
    }

    // print error stack

    console.error(`message:   ${err.message}
error code:   ${err.errorCode}\n
===========\n
stack trace: ${err.stack}\n
===========`);

    // send error to client
    if (!res.headersSent) {
        res.status(err.status || 500).json({
            errorCode: err.errorCode || 500000,
            message: err.message,
        })
    }
};
