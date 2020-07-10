
const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../data/get-categories');
const subcategory=require('../data/subcategories');
const page='category-menu-option';
const defaultCategory='womens-jewelry';


exports.home = async function(req, res) {
  try{
    const breadcrumbs= breadcrumb.breadcrumbsHome();
    let subcategories= await subcategory.getSubcategories(defaultCategory);
    let allCategories= await category.getAllCategories();
    let currentCategory=category.getCurrentCategory(allCategories,defaultCategory);
    res.render('index',{
      page:page,
      categories: allCategories,
      pressed: currentCategory,
      breadcrumbs:breadcrumbs,
      description:'description',
      subcategories:subcategories
    });
  }catch (e) {
    res.status(e.status || 500);
    res.render('error2');
  }

};

exports.category= async function(req, res) {
  try{
    const breadcrumbs=breadcrumb.breadcrumbsHome(req.params.category);
    let subcategories= await subcategory.getSubcategories(req.params.category);
    let allCategories= await category.getAllCategories();
    let currentCategory=category.getCurrentCategory(allCategories, req.params.category);
    res.render('index',{
      page:page,
      categories:allCategories,
      pressed:currentCategory,
      breadcrumbs:breadcrumbs,
      description:'description',
      subcategories:subcategories
    });
    //res.send('ceva');
  }catch (e) {
    res.status(e.status || 500);
    res.render('error2');
  }
  };

