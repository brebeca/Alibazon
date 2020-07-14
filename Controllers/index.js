const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../APIdata/get-categories');
const subcategory=require('../APIdata/subcategories');
const config =require('../config');

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
    console.log(config.baseURL+'categories?secretKey='+config.secretKEY);
    let breadcrumbs= breadcrumb.breadcrumbsHome();
    let subcategories= await subcategory.getSubcategories(config.defaultCategory);
    let allCategories= await category.getAllCategories();
    let currentCategory=category.getCurrentCategory(allCategories,config.defaultCategory);
    res.render('index',{
      page:config.homePage,
      categories: allCategories,
      pressed: currentCategory,
      breadcrumbs:breadcrumbs,
      subcategories:subcategories
    });
  }catch (e) {
    res.status(e.status || 500);
    res.render('error2');
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
    let breadcrumbs=breadcrumb.breadcrumbsHome(req.params.category);
    let subcategories= await subcategory.getSubcategories(req.params.category);
    res.render('index',{
      page:config.homePage,
      breadcrumbs:breadcrumbs,
      subcategories:subcategories
    });
  }catch (e) {
    res.status(e.status || 500);
    res.render('error2');
  }
  };

