const UserController = require('./usersController')();

const router = require('express').Router();

router.get('/', UserController.GetUsers);

module.exports = router;
