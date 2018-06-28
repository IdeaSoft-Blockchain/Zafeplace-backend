const fs = require('fs');
const mongoose = require('config/mongoose');

fs.readdirSync('db/models')
    .forEach(fileAndDir => {
        if (fs.lstatSync(`db/models/${fileAndDir}`).isDirectory()) {
            fs.readdirSync(`db/models/${fileAndDir}`)
                .forEach(filename => {
                    const model = require(`db/models/${fileAndDir}/${filename}`);
                    Object.assign(module.exports, {[model.modelName]: model})
                });
        } else {
            const model = require(`db/models/${fileAndDir}`);
            Object.assign(module.exports, {[model.modelName]: model})
        }
    });
Object.assign(module.exports, {mongoose});
