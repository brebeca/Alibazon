const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const subcategory=require('../APIdata/subcategories');
const config =require('../config');
const product=require('../APIdata/products');

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
    console.log("in search controler "+e);
    res.status(e.status || 500);
    res.render('error-pages/error2');
  }
};

/**
 * calls the function breadcrumb.breadcrumbsHome() to get the breadcrumbs object for the header of the page
 * calls the function subcategory.getSubcategories to get the subcategories for the default category and their proprieties
 * calls the function category.getAllCategories() to get all categories for the navbar
 * call category.getCurrentCategory to get the active/selected category
 * calls the render function to send the page to the browser
 * in case of error it sends an error page .
 * @param req
 * @param res
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
    res.render('error-pages/error2');
  }
};

/**
 * calls the breadcrumbsHome function to get tge breadcrumbs object for the home page
 * calls the subcategory.getSubcategories to get the subcategories for the selected category
 * calls the render function to send to the client the requested page
 * in case of error it sends an error page
 * @param req
 * @param res
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
    res.render('error-pages/error2');
  }
  };

