var express = require('express');
var router = express.Router();
var controller = require('../Controllers/index');
/* GET the main page ( the category menu ) */
router.get('/', controller.home);

/*GET the subcategory listing of a category page */
router.get('/home/:category', controller.subcategory);

module.exports = router;
