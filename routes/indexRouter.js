var express = require('express');
var router = express.Router();
var controller = require('../Controllers/index');
const verify=require('../utils/verify-middleware/verify-params');
const verifyToken=require('../utils/verify-middleware/verify-token');

/* GET the main page ( the category menu ) */
router.get('/' , controller.home);

/* GET the main page ( the category menu ) */
router.get('/home' , controller.home);

/*GET the subcategory listing of a category page */
router.get('/home/:category',verify.checkParams , controller.category);

/*GET the product details page. */
router.get('/search', controller.search);

module.exports = router;
