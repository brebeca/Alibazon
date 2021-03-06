var express = require('express');
var router = express.Router();
var controller = require('../Controllers/cartController');
const verifyToken=require('../utils/verify-middleware/verify-token'),
    verifyBody=require('../utils/verify-middleware/verify-body').addToCartBodyVerify;

/* POST product to cart */
router.post('/add' , verifyToken.shouldHaveTokenVerify, verifyBody, controller.add);

/* POST the order */
router.post('/buy',verifyToken.shouldHaveTokenVerify, controller.buy);

/* GET the cart page  */
router.get('/mycart' ,verifyToken.shouldHaveTokenVerify, controller.getCart);

/* GET number of items in cart */
router.post('/info' ,verifyToken.shouldHaveTokenVerify, controller.getInfo);

/* DELETE an item  */
router.delete('/delete' ,verifyToken.shouldHaveTokenVerify,verifyBody, controller.delete);


router.get('/success' , controller.finishPay);


router.get('/cancel' , controller.cancelPay);

module.exports = router;