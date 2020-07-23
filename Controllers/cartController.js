const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const config= require('../config');
const cartAPI= require('../APIdata/cartAPI');
const orderAPI= require('../APIdata/orderAPI');
const productsAPI=require('../APIdata/products');
const {ProductCartModel}=require('../utils/models/productModel');
const database=require('../utils/database-utils/db-functions');
const {paypal}=require('../utils/paypal-utils/paypal');
const {getJsonPayment}=require('../utils/paypal-utils/paypal-config');
const utils=require('../utils/utils-functions');

exports.cancelPay= async function(req, res){
    res.render(config.indexPage, await utils.getThePageVars('You canceled the payment. ','payment'));
}

exports.finishPay= async  function(req, res){
    try{
     await  paypal.payment.execute(req.query.paymentId, { payer_id: req.query.PayerID },async function (err, payment) {
            if(err){
                console.log(err);
                res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
              //  throw err;
            } else {
                //console.log(JSON.stringify(payment));
                res.render(config.indexPage, await utils.getThePageVars('Payment succeeded !','payment'));
            }
        });
        let cartItems= await cartAPI.get('cart',req.cookies.token);
        orderAPI.add(req.query.paymentId,cartItems,req.cookies.token)
            .then((result)=>{
              //  console.log(result);
            })
            .catch((err)=>{
            //    console.log(err);
            })
    }catch (e) {
        console.log(e);
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
    }

}

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

exports.delete = async function(req, res) {
    cartAPI.delete('cart',req.body.productID, req.body.variantID,req.cookies.token)
        .then((response)=>{
            // console.log(response);
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
            // console.log(err.error);
            res.status(400);
            res.json({message: err.error});
        })

};

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

