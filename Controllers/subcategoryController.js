const breadcrumb=require('../utils/breadcrumbs_functions');
const category=require('../data/get-categories');
const subcategory=require('../data/subcategories');
const product=require('../data/products');
const page='subcategory-page';

exports.subcategoryProductsPage =  async function(req, res, next) {
    //TO DO : add validation of the subcategory ( maybe another middleware )
    try{
        const breadcrumbs=breadcrumb.breadcrumbsSubcategoryProducts(req.params.subcategory);
        let allCategories= await category.getAllCategories();
        let currentCategory={};
        currentCategory.id= await subcategory.getCurrentCategoryParent( req.params.subcategory);
        let products= await product.getProductsForSubcategory(req.params.subcategory);

        res.render('index',{
            page:page,
            categories: allCategories,
            pressed: currentCategory,
            breadcrumbs:breadcrumbs,
            description:'description',
            products:products
        });
    }
    catch (e) {
        res.status(e.status || 500);
        res.render('error2');
    }
};

exports.productDetailsPage= async function(req, res, next) {
    //TO DO : add validation of the subcategory + product id ( maybe another middleware )
    try {
        let allCategories= await category.getAllCategories();
        let currentCategory={};
        currentCategory.id= await subcategory.getCurrentCategoryParent( req.params.subcategory);
        let selectedProduct= await product.getProductByID(req.params.id);
        const breadcrumbs=breadcrumb.breadcrumbsProductDetails(req.params.subcategory, selectedProduct.name);
        res.render('index', {
            page:'product-page',
            categories: allCategories,
            pressed:currentCategory,
            breadcrumbs:breadcrumbs,
            description:'description',
            product:selectedProduct
        });
    }catch (e) {
        console.log(e);
        res.status(e.status || 500);
        res.render('error2');
    }
    };
