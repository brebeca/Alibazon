var express = require('express');
var router = express.Router();
var controller = require('../Controllers/wishListController');
const verifyToken=require('../utils/verify-middleware/verify-token'),
    verifyBody=require('../utils/verify-middleware/verify-body').addToCartBodyVerify;

/* POST product to cart */
router.post('/add' , verifyToken.shouldHaveTokenVerify, verifyBody, controller.add);

/* GET the cart page ( the category menu ) */
router.get('/myWishList' ,verifyToken.shouldHaveTokenVerify, controller.getWishList);

/* DELETE an item*/
router.delete('/delete' ,verifyToken.shouldHaveTokenVerify,verifyBody, controller.delete);


module.exports = router;