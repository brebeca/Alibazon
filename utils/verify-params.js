const categoryAPI=require('../data/get-categories');
const subcategoryAPI=require('../data/subcategories');
const productAPI=require('../data/products');
const config =require('../config');
const breadcrumb=require('../utils/breadcrumbs_functions');

/**
 * checks if the specific params exist and calls the verify fuction
 * if the verify function returns false it throws an error
 * if not, next function is called
 * in case of error the 404 error page is sent to the browser with the information needed for the header
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.checkParams= async function(req, res, next) {
    try {
        if(req.params.category!==undefined &&  false === await verifyCategory(req.params.category,res) ){
            throw 'Invalid category name';
        }
        if(req.params.subcategory!==undefined &&  false === await verifySubcategory(req.params.subcategory,res) ){
           throw 'Invalid subcategory name';
        }
        if(req.params.id!==undefined &&  false === await verifyProductID(req.params.id,res) ){
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

/**
 * calls subcategoryAPI.getCurrentCategoryParent
 * if no error, it adds the value resolved by the promise ,id, to the object res.locals.pressed, returns true
 * in case of error sets returnVal to false
 * @param subcategory           the category to be chacked
 * @param res                    the response object
 * @returns {Promise<boolean>}   true if no error ; flase, else
 */
async function verifySubcategory(subcategory,res) {
    let returnVal=true;
    await subcategoryAPI.getCurrentCategoryParent(subcategory).then((id)=>{
        res.locals.pressed={ id: id};
    }).catch((err)=>{
        returnVal= false ;
    });
    return returnVal;
 }

/**
 * gets all the categories
 * searches for the category object with the id field to be category parameter
 * if exists, it sets  res.locals.categories,  res.locals.active,  res.locals.pressed and returns true
 * if it dose not exist, it returns false
 * @param category      the category id to be checked
 * @param res           the response object
 * @returns {Promise<boolean>}
 */
async function verifyCategory(category, res) {
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


/**
 * calls productAPI.getProductByID(id)
 * if no error , it sets res.locals.product
 * else sets returnVal to false
 * @param id                   the product id to be checked
 * @param res                  the response object
 * @returns {Promise<boolean>}  returns true if no error, else returns false
 */
async function verifyProductID(id,res) {
    let returnVal=true;
    await productAPI.getProductByID(id).then((product)=>{
        res.locals.product=product;
    }).catch((err)=>{
        returnVal= false ;
    });
    return returnVal;
}