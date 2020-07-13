const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../data/get-categories');
const subcategory=require('../data/subcategories');
const product=require('../data/products');
const config= require('../config');

exports.subcategoryProductsPage =  async function(req, res) {
    try{
        const breadcrumbs=breadcrumb.breadcrumbsSubcategoryProducts(req.params.subcategory);
        let allCategories= await category.getAllCategories();
        let products= await product.getProductsForSubcategory(req.params.subcategory);
        res.render('index',{
            page:config.productsPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            products:products
        });
    }
    catch (e) {
        console.log(e);
        res.status(e.status || 500);
        res.render('error2');
    }
};

exports.productDetailsPage= async function(req, res) {
    try {
        let allCategories= await category.getAllCategories();
        const breadcrumbs=breadcrumb.breadcrumbsProductDetails(req.params.subcategory,res.locals.product.name );
        res.render('index', {
            page:config.productDetailsPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
        });
    }catch (e) {

        res.status(e.status || 500);
        res.render('error2');
    }
    };
