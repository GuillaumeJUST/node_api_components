const routes = require('express').Router();
const config = require('config');

const v1 = require('./v1');
routes.use('/v1', v1);

switch (config.get('api.default_version')) {
    case 'v1':
        routes.use('/', v1);
        break;
    case 'v0':
    case null:
    default:
        routes.get('/', (req, res) => {
            res.json({data: {message : 'Connected!'}});
        });
}

// Swagger
if (config.get('develop')) {
    const swaggerDef = require('./swaggerDef');
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');
    const swaggerSpec = swaggerJSDoc(swaggerDef);
    routes.use('/docs', swaggerUi.serve);
    routes.get('/docs', swaggerUi.setup(swaggerSpec));
}

module.exports = routes;
