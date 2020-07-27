var express = require('express');
var router = express.Router();
var logincontroller = require('../Controllers/authControllers/loginController');
const signUpController=require('../Controllers/authControllers/signUpController'),
    verify=require('../utils/verify-middleware/verify-body'),
    tokenVerify=require('../utils/verify-middleware/verify-token'),
    logoutController=require('../Controllers/authControllers/logoutController');


/* Submit the login form  */
router.post('/login', verify.loginBodyVerify, logincontroller.loginValidation);

/* GET the login page  */
router.get('/login',tokenVerify.shouldNotHaveTokenVerify, logincontroller.loginPage);

/* GET the codeverify  page  */
router.get('/signup/codeverify', tokenVerify.shouldHaveTokenVerify,signUpController.codeVerifyPage);

/* Submit the signUp form  */
router.post('/signup', verify.signUpBodyVerify,  signUpController.signUpSendMail);

/* Submit the code verify form  */
router.post('/signup/codeverify', verify.codeBodyVerify,  signUpController.verifyCode);

/* GET the signUp page  */
router.get('/signup',tokenVerify.shouldNotHaveTokenVerify, signUpController.signUpPage);

/* DELETE the cookie */
router.delete('/logout', tokenVerify.shouldHaveTokenVerify, logoutController.logOut);

module.exports = router;
