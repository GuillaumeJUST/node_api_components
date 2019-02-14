const Auth = require('./auth');
const AuthController = require('./authController')(Auth);
const AuthValidation = require('./authValidation');

const router = require('express').Router();

router.post('/signInWithEmail',
    AuthValidation.getValidations('loginWithEmail'),
    AuthValidation.checkValidationResult,
    AuthController.SignInWithEmail
);

router.post('/signUpWithEmail',
    AuthValidation.getValidations('loginWithEmail'),
    AuthValidation.checkValidationResult,
    AuthController.SignUpWithEmail
);

router.post('/updatePassword',
    AuthValidation.getValidations('updatePassword'),
    AuthValidation.checkValidationResult,
    AuthController.UpdatePassword
);

router.post('/signOut',
    AuthValidation.getValidations('signOut'),
    AuthValidation.checkValidationResult,
    AuthController.SignOut
);

module.exports = router;
