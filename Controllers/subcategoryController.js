const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const subcategory=require('../APIdata/subcategories');
const product=require('../APIdata/products');
const config= require('../config');

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
        let products= await product.getProductsForSubcategory(req.params.subcategory);
        res.render(config.indexPage,{
            page:config.productsPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            products:products
        });
    }
    catch (e) {
        res.status(e.status || 500);
        res.render('error2');
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
        res.render('/error-pages/error2');
    }
    };
