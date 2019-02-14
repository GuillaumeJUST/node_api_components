const routes = require('express').Router();
const config = require('config');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

const v1 = require('./v1');
routes.use('/v1', v1);

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
