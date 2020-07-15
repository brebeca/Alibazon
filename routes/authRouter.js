var express = require('express');
var router = express.Router();
var logincontroller = require('../Controllers/loginController');
const signUpController=require('../Controllers/signUpController');
const verify=require('../utils/verify-middleware/verify-body');


/* Submit the login form  */
router.post('/login', verify.loginBodyVerify, logincontroller.loginValidation);

/* GET the login page  */
router.get('/login', logincontroller.loginPage);

/* Submit the signUp form  */
router.post('/signup', verify.signUpBodyVerify,  signUpController.signUpValidation);

/* GET the signUp page  */
router.get('/signup', signUpController.signUpPage);


module.exports = router;
