const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const config= require('../config');
const cartAPI= require('../APIdata/cartAPI');
const productsAPI=require('../APIdata/products');
const {ProductCartModel}=require('../utils/models/productModel');

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
        let breadcrumbs=breadcrumb.breadcrumbsCart();
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
       // console.log(e);
        res.status( 500);
        res.render('error-pages/error2');
    }
}

exports.getInfo= async function(req, res) {
    try{
        let cartItems = await cartAPI.get('cart',req.cookies.token);
        let wishListItmes= await cartAPI.get('wishlist',req.cookies.token);

        res.status(200);
        res.json({cart:cartItems.length, wishlist: wishListItmes.length});
    }
    catch (e) {
        res.status(400);
        res.json({message: e});
    }
}

