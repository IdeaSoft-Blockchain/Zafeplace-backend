const {readdirSync, lstatSync} = require('fs');
const {validationSchema} = require('libs/validator');

module.exports = object = readdirSync('app/controllers')
    .filter(name => lstatSync(`app/controllers/${name}`).isDirectory())
    .reduce((controllersAccumulator, dir) => Object.assign(
        controllersAccumulator,
        {
            [dir]: readdirSync(`app/controllers/${dir}`)
                .map(fileName => require(`app/controllers/${dir}/${fileName}`))
                .reduce((accum, controllerFile) => Object.assign(
                    accum,
                    Object.keys(controllerFile).reduce(validationSchema.bind(null, dir, controllerFile), {})
                ), {}),
        }), {});
