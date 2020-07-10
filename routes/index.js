var express = require('express');
var router = express.Router();
var controller = require('../Controllers/index');
const verify=require('../utils/verify-params');

/* GET the main page ( the category menu ) */
router.get('/' ,controller.home);

/* GET the main page ( the category menu ) */
router.get('/home', controller.home);

/*GET the subcategory listing of a category page */
router.get('/home/:category', controller.category);

module.exports = router;
