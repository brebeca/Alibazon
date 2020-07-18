var express = require('express');
var router = express.Router();
var logincontroller = require('../Controllers/authControllers/loginController');
const signUpController=require('../Controllers/authControllers/signUpController');
const verify=require('../utils/verify-middleware/verify-body');
const tokenVerify=require('../utils/verify-middleware/verify-token');
const logoutController=require('../Controllers/authControllers/logoutController');


/* Submit the login form  */
router.post('/login', verify.loginBodyVerify, logincontroller.loginValidation);

/* GET the login page  */
router.get('/login',tokenVerify.shouldNotHaveTokenVerify, logincontroller.loginPage);

/* Submit the signUp form  */
router.post('/signup', verify.signUpBodyVerify,  signUpController.signUpValidation);

/* GET the signUp page  */
router.get('/signup',tokenVerify.shouldNotHaveTokenVerify, signUpController.signUpPage);

/* DELETE the cookie */
router.delete('/logout', tokenVerify.shouldHaveTokenVerify, logoutController.logOut);

module.exports = router;
