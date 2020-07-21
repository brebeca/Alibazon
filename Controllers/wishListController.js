const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const config= require('../config');
const wishListAPI= require('../APIdata/cartAPI');
const productsAPI=require('../APIdata/products');
const {ProductCartModel}=require('../utils/models/productModel');

exports.add = async function(req, res) {
    wishListAPI.add('wishlist',req.body.productID, req.body.variantID,req.body.quantity,req.cookies.token)
        .then((response)=>{
             console.log(response);
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
             console.log(err.error);
            res.status(400);
            res.json({message: err.error});
        });
};


exports.getWishList= async function(req, res) {
    try{
        let breadcrumbs=breadcrumb.getBreadcrumbs('wish list');
        let allCategories = await category.getAllCategories();
        let cartItems = await wishListAPI.get('wishlist',req.cookies.token);
        let products=[];
        for (const item of cartItems) {
            let product= await productsAPI.getProductByID(item.productId,0);
            let cartProduct=new ProductCartModel(product,item);
            products.push(cartProduct);
        }
        res.render(config.indexPage,{
            page:config.wishListPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            products:products,
            pressed:'none',
            pageType:'wishlist'
        });
    }
    catch (e) {
        // console.log(e);
        res.status(e.status || 500);
        res.render('/error-pages/error2');
    }
}


exports.delete = async function(req, res) {
    wishListAPI.delete('wishlist',req.body.productID, req.body.variantID,req.cookies.token)
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