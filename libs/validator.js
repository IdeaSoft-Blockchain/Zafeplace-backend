const validationSchema = require('config/validationSchema');
const {validationResult} = require('express-validator/check');
const {errorGenerator} = require('libs/error');
const {isLogging} = require('config');

const errorChecker = (req, res, next) => {
    const [error] = validationResult(req).array();
    return error ? next(errorGenerator(error.msg)) : next()
};

const resultSend = (res, result) => res.json(result);

exports.validationSchema = (dir, controllers, accum, key) => {
    const controller = (req, res, next) => Promise
        .resolve(controllers[key](req, res, next))
        .then(resultSend.bind(null, res))
        .catch(next);

    if (isLogging && !(validationSchema[dir] && validationSchema[dir][key])) {
        console.error(`No validation schema! Controller: ${[key]}`)
    }

    return Object.assign(accum, {
        [key]: validationSchema[dir] && validationSchema[dir][key]
            ? [validationSchema[dir][key], errorChecker, controller]
            : controller,
    })
};
