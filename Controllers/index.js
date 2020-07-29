/**
 * Index Controller module.
 * @module Controllers/index
 * @see module:APIdata/get-categories
 * @see module:APIdata/subcategories
 * @see module:APIdata/products
 */
const breadcrumb=require('../utils/breadcrumbs_functions'),
    category=require('../APIdata/get-categories'),
    subcategory=require('../APIdata/subcategories'),
    config =require('../config'),
    product=require('../APIdata/products'),
    utils=require('../utils/utils-functions');

/**
 * Renders the search page with the products for the keyword
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.search =  async function(req, res) {
  try{
    let breadcrumbs=breadcrumb.getBreadcrumbs('search-'+req.query.key);
    let allCategories= await category.getAllCategories();
    let products= await product.getProductsSearch(req.query.key);

    res.render(config.indexPage,{
      page:config.searchPage,
      categories: allCategories,
      breadcrumbs:breadcrumbs,
      products:products,
      pressed:'none'
    });
  }
  catch (e) {
    console.log(e);
    res.status(e.status || 500);
    res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
  }
};

/**
 * Renders the home page with the default category set in the server
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.home = async function(req, res) {
  try{
   let breadcrumbs= await breadcrumb.breadcrumbsSubcategory(config.defaultCategory);
    let subcategories= await subcategory.getSubcategories(config.defaultCategory);
    let allCategories= await category.getAllCategories();
    let currentCategory=category.getCurrentCategory(allCategories,config.defaultCategory);
    res.render(config.indexPage,{
      page:config.homePage,
      categories: allCategories,
      pressed: currentCategory,
      breadcrumbs:breadcrumbs,
      subcategories:subcategories,
      depth:breadcrumbs.path.length
    });
  }catch (e) {
    console.log(e);
    res.status(e.status || 500);
    res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
  }
};

/**
 *Renders the category page for the category in req.params.category
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.category= async function(req, res) {
  try{
    let breadcrumbs= await breadcrumb.breadcrumbsSubcategory(req.params.category);
    let subcategories= await subcategory.getSubcategories(req.params.category);
    res.render(config.indexPage,{
      categories:await category.getAllCategories(),
      page:config.homePage,
      breadcrumbs:breadcrumbs,
      depth:breadcrumbs.path.length,
      subcategories:subcategories,
      pressed:'none'
    });
  }catch (e) {
    console.log(e);
    res.status(e.status || 500);
    res.render(config.indexPage, await utils.getThePageVars('Something went wrong!','error'));
  }
  };

