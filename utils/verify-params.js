const categoryAPI=require('../data/get-categories');
const subcategoryAPI=require('../data/subcategories');
const productAPI=require('../data/products');
const config =require('../config');
const breadcrumb=require('../utils/breadcrumbs_functions');

/* Checks if the subcategory in the parmas exists*/
exports.checkParams= async function(req, res, next) {
    try {
        if(req.params.category!==undefined &&  false === await varifyCategory(req.params.category,res) ){
            throw 'Invalid category name';
        }
        if(req.params.subcategory!==undefined &&  false === await varifySubcategory(req.params.subcategory,res) ){
           throw 'Invalid subcategory name';
        }
        if(req.params.id!==undefined &&  false === await varifyProductID(req.params.id,res) ){
            throw 'Invalid product ';
        }
        next();
    } catch (e) {
        res.status(404);
        res.render('index',{
            page:config.notFoundPage,
            categories: await categoryAPI.getAllCategories(),
            pressed: 'none',
            breadcrumbs:breadcrumb.breadcrumbsPageNotFound()
        });
    }
};


async function varifySubcategory(subcategory,res) {
    let returnVal=true;
    await subcategoryAPI.getCurrentCategoryParent(subcategory).then((id)=>{
        res.locals.pressed={ id: id};
    }).catch((err)=>{
        returnVal= false ;
    });
    return returnVal;
 }

async function varifyCategory(category, res) {
    let categories = await  categoryAPI.getAllCategories();
    let wantedCategory = categories.filter(function (item) {
        return item.id === category;
    });

    if(wantedCategory.length!==0)
    {
        res.locals.categories=categories;
        res.locals.active= wantedCategory[0];
        res.locals.pressed=wantedCategory[0];
        return true;
    }
    return false;
}

async function varifyProductID(id,res) {
    let returnVal=true;
    await productAPI.getProductByID(id).then((product)=>{
        res.locals.product=product;

    }).catch((err)=>{
        returnVal= false ;
    });
    return returnVal;
}