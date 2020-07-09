var express = require('express');
var router = express.Router();
var controller= require('../Controllers/subcategoryController')

/* GET the products displayed for a specific subcategory. */
router.get('/:subcategory',controller.subcategoryProductsPage );

/*GET the product details page. */
router.get('/:subcategory/:id', controller.productDetailsPage);

module.exports = router;
