const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected to V1'});
});

const todosAPI = require('../../components/todos/todosAPI');
routes.use('/todos', todosAPI);

const authAPI = require('../../components/auth/authAPI');
routes.use('/auth', authAPI);

module.exports = routes;
