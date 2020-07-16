const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const config= require('../config');
const cartAPI= require('../APIdata/cartAPI');
const productsAPI=require('../APIdata/products');
const {ProductCartModel}=require('../utils/models/productModel');

exports.add = async function(req, res) {
    cartAPI.add(req.body.productID, req.body.variantID,1,req.cookies.token)
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

exports.getCart= async function(req, res) {
    try{
        let breadcrumbs=breadcrumb.breadcrumbsCart();
        let allCategories = await category.getAllCategories();
        let cartItems = await cartAPI.get(req.cookies.token);
        let products=[];
        for (const item of cartItems) {
            let product= await productsAPI.getProductByID(item.productId,0);
            products.push(new ProductCartModel(product,item));
        }

        res.render('index',{
            page:config.cartPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            products:products,
            pressed:'none'
        });
    }
    catch (e) {
        console.log(e);
        res.status(e.status || 500);
        res.render('error2');
    }
}

