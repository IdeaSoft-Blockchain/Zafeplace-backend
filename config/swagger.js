const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const {Router} = express;
const router = Router();
const errors = require('config/errors');

const controllersPathways = fs
    .readdirSync('app/controllers')
    .filter(name => fs.lstatSync(`app/controllers/${name}`).isDirectory())
    .reduce((controllers, dir) => controllers
        .concat(fs
            .readdirSync(`app/controllers/${dir}`)
            .map(filename => `app/controllers/${dir}/${filename}`)
        ), []);

// Initialize swagger-jsdoc -> returns validated swagger spec in json format

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'Zafeplace',
            description: 'The interactive swagger-ui doc',
            version: '3.0.0',
            tags: [
                'session'
            ]
        }
    },
    apis: ['config/swaggerDefinitions.js', ...controllersPathways]
});

swaggerSpec.definitions = Object.assign({
    errorCodesDescriptions: {
        type: 'object',
        definitions: 'existing errorCodes',
        properties: Object
            .keys(errors)
            .reduce((accumulator, key) => Object.assign(accumulator, {
                [key]: {
                    type: 'object',
                    properties: {
                        errorCode: {
                            type: 'number',
                            example: key
                        },
                        message: {
                            type: 'string',
                            example: errors[key]
                        }
                    }
                }
            }), {})
    }
}, swaggerSpec.definitions);

router.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec)
});

module.exports = [
    express.static('swagger-ui/dist'),
    router
];
