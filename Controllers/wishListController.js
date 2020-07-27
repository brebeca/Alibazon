const breadcrumb=require('../utils/breadcrumbs_functions'),
    category=require('../APIdata/get-categories'),
    config= require('../config'),
    wishListAPI= require('../APIdata/cartAPI'),
    productsAPI=require('../APIdata/products'),
    {ProductCartModel}=require('../utils/models/productModel'),
    utils=require('../utils/utils-functions');

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
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
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