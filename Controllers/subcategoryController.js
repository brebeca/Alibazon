const breadcrumb=require('../utils/breadcrumbs_functions'),
    category=require('../APIdata/get-categories'),
    subcategory=require('../APIdata/subcategories'),
    product=require('../APIdata/products'),
    config= require('../config'),
    {VariantsModel}=require('../utils/models/variantsModel'),
    utils=require('../utils/utils-functions');



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
       let breadcrumbs=await breadcrumb.breadcrumbsSubcategory(req.params.subcategory);
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
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
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
        let breadcrumbs= await breadcrumb.breadcrumbsProductDetails(req.params.subcategory,res.locals.product.name );
        res.render(config.indexPage, {
            page:config.productDetailsPage,
            categories: allCategories,
            breadcrumbs:breadcrumbs,
            pressed:'none'
        });
    }catch (e) {
        console.log(e);
        res.status(e.status || 500);
        res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
    }
    };
