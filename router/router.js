const routes = require('express').Router();
const config = require('config');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

const todosAPI = require('../components/todos/todosAPI');
routes.use('/todos', todosAPI);

const usersAPI = require('../components/users/usersAPI');
routes.use('/users', usersAPI);

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
