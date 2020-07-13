const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../data/get-categories');
const subcategory=require('../data/subcategories');
const config =require('../config');


exports.home = async function(req, res) {
  try{
    const breadcrumbs= breadcrumb.breadcrumbsHome();
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
    //res.render('test');
  }catch (e) {
    res.status(e.status || 500);
    res.render('error2');
  }

};

exports.category= async function(req, res) {
  try{
    const breadcrumbs=breadcrumb.breadcrumbsHome(req.params.category);
    let subcategories= await subcategory.getSubcategories(req.params.category);
    res.render('index',{
      page:config.homePage,
      breadcrumbs:breadcrumbs,
      subcategories:subcategories
    });
    //res.send('ceva');
  }catch (e) {
    res.status(e.status || 500);
    res.render('error2');
  }
  };

