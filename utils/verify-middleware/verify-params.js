/**
 * Request parameters verify module.
 * @module Verify-middleware/verify-params
 * @see module:APIdata/get-categories
 * @see module:APIdata/subcategories
 * @see module:APIdata/products
 */

const categoryAPI=require('../../APIdata/get-categories');
const subcategoryAPI=require('../../APIdata/subcategories');
const productAPI=require('../../APIdata/products');
const config =require('../../config');
const utils=require('../utils-functions');

/**
 * checks if the specific params exist and calls the verify fuction
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
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
        if(req.params.id!==undefined &&  false === await verifyProductID(req.params.id,res,req.params.subcategory) ){
            throw 'Invalid product ';
        }
        next();
    } catch (e) {
       // console.log(e);
        res.status(404);
        res.render(config.indexPage, await utils.getThePageVars('Page not found','page not found'));
    }
};

/**
 * calls subcategoryAPI.getCurrentCategoryParent
 * if no error, it adds the value resolved by the promise ,id, to the object res.locals.pressed, returns true
 * in case of error sets returnVal to false
 * @param subcategory           the category to be chacked
 * @param {Object}res                    the response object
 * @returns {Promise<boolean>}   true if no error ; flase, else
 */
async function verifySubcategory(subcategory,res) {
    let returnVal=true;
    await subcategoryAPI.getCurrentCategoryParent(subcategory).then((id)=>{
        res.locals.pressed={ id: id};
    }).catch((err)=>{
       // console.log(err);
        returnVal= false ;
    });
    return returnVal;
 }

/**
 * checks if the category in the params exists
 * if it dose not exist, it returns false
 * @param {string}category      the category id to be checked
 * @param {Object}res                    the response object
 * @returns {Promise<boolean>}   true if the category in the params exists, false else
 */
async function verifyCategory(category, res) {
    let categories = await  categoryAPI.getAllCategories(url,key);
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
 * checks if the product id exists for the parentCaregory in the params
 * @param {string}id                   the product id to be checked
 * @param {Object}res                    the response object
 * @param {string}parentCaregory   the category
 * @returns {Promise<boolean>}  returns true if no error, else returns false
 */
async function verifyProductID(id,res,parentCaregory) {
    let returnVal=true;
    await productAPI.getProductByID(id,1).then((product)=>{
       if(product.parentCategory!==parentCaregory)
            returnVal= false ;
        else
            res.locals.product=product;
    }).catch((err)=>{
        returnVal= false ;
    });
    return returnVal;
}
exports.checksubcategory=verifySubcategory;
exports.checkcategory=verifyCategory;
exports.checkproductID=verifyProductID;