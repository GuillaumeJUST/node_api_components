const Auth = require('./auth');
const AuthController = require('./authController')(Auth);
const AuthValidation = require('./authValidation');

const router = require('express').Router();

router.post('/SignInWithEmail',
    AuthValidation.getValidations('login'),
    AuthValidation.checkValidationResult,
    AuthController.SignInWithEmail
);
module.exports = router;
