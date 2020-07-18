var express = require('express');
var router = express.Router();
var controller= require('../Controllers/subcategoryController');
const verify=require('../utils/verify-middleware/verify-params');

/* GET the products displayed for a specific subcategory. */
router.get('/:subcategory',verify.checkParams,controller.subcategoryProductsPage );

/*GET the product details page. */
router.get('/:subcategory/:id',verify.checkParams, controller.productDetailsPage);

/*GET the product details page. */
router.get('/:subcategory/more/:page',verify.checkParams, controller.getMoreOfSubcategory);

module.exports = router;
