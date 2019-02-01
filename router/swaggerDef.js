// Swagger definition
const swaggerDefinition = {
    info: {
        title: 'DocDoc API', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'This is the REST API for DocDoc', // short description of the app
    },
    host: '127.0.0.1:2000', // the host or url of the app
    basePath: '/api', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['../components/**/*Def.yml'],
};

module.exports = options;
