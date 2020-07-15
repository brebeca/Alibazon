var express = require('express');
var router = express.Router();
var controller = require('../Controllers/cartController');
const verify=require('../utils/verify-middleware/verify-params');
const verifyToken=require('../utils/verify-middleware/verify-token');

/* POST product to cart */
router.post('/add' , controller.add);

/* GET the cart page ( the category menu ) */
router.get('/mycart' , controller.add);


module.exports = router;