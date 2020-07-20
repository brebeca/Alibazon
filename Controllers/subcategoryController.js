const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const subcategory=require('../APIdata/subcategories');
const product=require('../APIdata/products');
const config= require('../config');
const {VariantsModel}=require('../utils/models/variantsModel');

/**
 * calls the breadcrumbsHome function to get tge breadcrumbs object for the home page
 * calls the category.getAllCategories to get all categories for the navbar
 * calls product.getProductsForSubcategory to get the products from that subcategory
 * calls the render function to send to the client the requested page
 * in case of error it sends an error page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.subcategoryProductsPage =  async function(req, res) {
    try{
        let breadcrumbs=breadcrumb.breadcrumbsSubcategoryProducts(req.params.subcategory);
        let allCategories= await category.getAllCategories();
        let products= await product.getProductsForSubcategory(req.params.subcategory,1);
        let variationFilters= [];
        products[0].variation_attributes.forEach((variation)=>{
            variationFilters.push(new VariantsModel(variation,products));
        });
        res.render(config.indexPage,{
            page:config.productsPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            products:products,
            filters:variationFilters
        });
    }
    catch (e) {
        console.log(e);
        res.status(e.status || 500);
        res.render('error-pages/error2');
    }
};


exports.subcategoryProductsInfo=  async function(req, res) {
    try{
        let products= await product.getProductsForSubcategory(req.params.subcategory,1);
        res.status(200);
        res.json(products);
    }
    catch (e) {
        res.status(500);
        res.json({error:e});
    }
};

exports.getMoreOfSubcategory =  async function(req, res) {
    try{
        let products= await product.getProductsForSubcategory(req.params.subcategory,req.params.page);
        if(products.length===0)
        {
            res.status(400);
            res.json({message:'no more products'});
        }
        else{
            res.status(200);
            res.json(products);
        }
    }
    catch (e) {
        res.status(500);
        res.json({error:e});
    }
};

/**
 * calls the breadcrumbsHome function to get tge breadcrumbs object for the home page
 * calls the category.getAllCategories to get all categories for the navbar
 * calls the render function to send to the client the requested page
 * in case of error it sends an error page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.productDetailsPage= async function(req, res) {
    try {
        let allCategories= await category.getAllCategories();
        let breadcrumbs=breadcrumb.breadcrumbsProductDetails(req.params.subcategory,res.locals.product.name );
        res.render(config.indexPage, {
            page:config.productDetailsPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
        });
    }catch (e) {
        console.log(e);
        res.status(e.status || 500);
        res.render('error-pages/error2');
    }
    };
