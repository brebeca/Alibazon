const breadcrumb=require('../utils/breadcrumbs_functions'),
    category=require('../APIdata/get-categories'),
    config= require('../config'),
    wishListAPI= require('../APIdata/cartAPI'),
    productsAPI=require('../APIdata/products'),
    {ProductCartModel}=require('../utils/models/productModel'),
    utils=require('../utils/utils-functions');

/**
 * Ads an object to the users wishlist and sends an object with success/failure message as json
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.add = async function(req, res) {
    wishListAPI.add('wishlist',req.body.productID, req.body.variantID,req.body.quantity,req.cookies.token)
        .then((response)=>{
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
            res.status(400);
            res.json({message: err.error});
        });
};

/**
 * Renders the wishlist page
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
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
        res.status(e.status || 500);
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
    }
}

/**
 * Deletes the product with the id from body.productID and variant from body.variantID from the users wishlist and sends an object with success/failure message as json
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.delete = async function(req, res) {
    wishListAPI.delete('wishlist',req.body.productID, req.body.variantID,req.cookies.token)
        .then((response)=>{
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
            res.status(400);
            res.json({message: err.error});
        })

};