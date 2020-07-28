const breadcrumb=require('../utils/breadcrumbs_functions'),
    category=require('../APIdata/get-categories'),
    config= require('../config'),
    cartAPI= require('../APIdata/cartAPI'),
    orderAPI= require('../APIdata/orderAPI'),
    productsAPI=require('../APIdata/products'),
    {ProductCartModel}=require('../utils/models/productModel'),
    database=require('../utils/database-utils/db-functions'),
    {paypal}=require('../utils/paypal-utils/paypal'),
    {getJsonPayment}=require('../utils/paypal-utils/paypal-config'),
    utils=require('../utils/utils-functions');


/**
 * Renders a cancel payment message page
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.cancelPay= async function(req, res){
    res.render(config.indexPage, await utils.getThePageVars('You canceled the payment. ','payment'));
}


/**
 * Finishes the payment with paypal, places the order and sends to client a message page
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.finishPay= async  function(req, res){
    try{
     await  paypal.payment.execute(req.query.paymentId, { payer_id: req.query.PayerID },async function (err, payment) {
            if(err){
                console.log(err);
                res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
                throw err;
            } else {
                res.render(config.indexPage, await utils.getThePageVars('Payment succeeded !','payment'));
            }
        });
        let cartItems= await cartAPI.get('cart',req.cookies.token);
        await orderAPI.add(req.query.paymentId, cartItems, req.cookies.token);
    }catch (e) {
        console.log(e);
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
    }

}

/**
 * Creates payment with the objects from the users cart and redirects the user to the paypal page
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.buy= async function(req, res){
    try {
        let cartItems= await cartAPI.get('cart',req.cookies.token);
        let orderItems=[];
        let total=0;
        cartItems.forEach((cartItem)=>{
           let  orderItem={
                "name": cartItem.productId,
                "sku": cartItem.productId,
                "price": cartItem.variant.price,
                "currency": "USD",
                "quantity": cartItem.quantity
            }
            total+=cartItem.quantity*cartItem.variant.price;
           orderItems.push(orderItem);
        })
        const create_payment_json= getJsonPayment(orderItems,total);
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i =0; i<payment.links.length; i++){
                    if(payment.links[i].rel==='approval_url')
                        res.redirect(payment.links[i].href);
                }
            }
        });
    }catch (e) {
       // console.log(e);
        res.status(400);
        res.json({message: e});
    }

}

/**
 * Ads an item in the users cart and sends an json with success or error message
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.add = async function(req, res) {
    cartAPI.add('cart',req.body.productID, req.body.variantID,req.body.quantity,req.cookies.token)
        .then((response)=>{
           // console.log(response);
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
           // console.log(err.error);
            res.status(400);
            res.json({message: err.error});
        });
};

/**
 * Deletes an item from the users cart and sends an json with success or error message
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.delete = async function(req, res) {
    cartAPI.delete('cart',req.body.productID, req.body.variantID,req.cookies.token)
        .then((response)=>{
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
            res.status(400);
            res.json({message: err.error});
        })

};

/**
 * Renders the cart page for the users cart
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.getCart= async function(req, res) {
    try{
        let breadcrumbs=breadcrumb.getBreadcrumbs('cart');
        let allCategories = await category.getAllCategories();
        let cartItems = await cartAPI.get('cart',req.cookies.token);
        let products=[];
        let totalPrice=0;
        for (const item of cartItems) {
            let product= await productsAPI.getProductByID(item.productId,0);
            let cartProduct=new ProductCartModel(product,item);
            products.push(cartProduct);
            totalPrice+=cartProduct.price;
        }
        res.render(config.indexPage,{
            page:config.cartPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            products:products,
            pressed:'none',
            totalPrice:totalPrice,
            pageType:'cart'
        });
    }
    catch (e) {
        console.log(e);
        res.status( 500);
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
    }
}

/**
 * Sends to the client a json with the number of items in the user cart and wishlist and whether the email is confirmed or not
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.getInfo= async function(req, res) {
    try{
        let cartItems = await cartAPI.get('cart',req.cookies.token);
        let wishListItmes= await cartAPI.get('wishlist',req.cookies.token);
        let confirmed= await database.isEmailConfirmed(req.body.email);

        res.status(200);
        res.json({cart:cartItems.length, wishlist: wishListItmes.length, email_Confirmed:confirmed});
    }
    catch (e) {
        res.status(400);
        res.json({message: e});
    }
}

