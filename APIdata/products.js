
/**
 * productsAPI module.
 * @module APIdata/products
 */

const request   = require('request');
const config= require('../config');
const utils=require('../utils/utils-functions');
const {ProductModel}= require('../utils/models/productModel');

/**
 * Gets the products.js of a subcategory for a specific page
 * @param {string}subcategoryID    the id for the requested subcategory
 * @param {string|number}page page number
 * @returns {Promise<Array>} A promise to an array of products.js
 */
exports.getProductsForSubcategory=  (subcategoryID,page) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'products/product_search?primary_category_id='+subcategoryID+'&secretKey='+config.secretKEY+'&page='+page,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    reject({error:error});
                } else {
                    let products=JSON.parse(response.body);
                    if(products.error!==undefined){
                        if('Product Not Found'===products.error)
                            resolve([]);
                        reject({error:products.error});
                    }
                    else {
                        if (utils.isIterable(products))
                            products.forEach(function (item, index) {
                                item.img_path = utils.getImgPath(item, index,'medium');
                            });
                        resolve(products);
                    }
                }
            });
    });

}

/**
 * Gets the products.js represented by the keyWord
 * @param {string}keyWord the key word for the search
 * @returns {Promise<Array>} A promise to an array of products.js
 */
exports.getProductsSearch=  (keyWord) =>{

    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'products/product_search?page_title='+keyWord+'&secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    reject({error:error});
                } else {
                    let products=JSON.parse(response.body);
                    if(products.error!==undefined){
                        if('Product Not Found'===products.error)
                            resolve([]);
                        reject({error:products.error});
                    }
                    else {
                        let productList=[];
                        products.forEach((item)=>{
                            productList.push(new ProductModel(item));
                        })
                        resolve(productList);
                    }
                }
            });
    });

}

/**
 *  Gets the product with the id ID
 * @param {string}ID    the id of the requested product
 * @param {number}type  type of request : 0 for the raw product , 1 for the product model
 * @returns {Promise<ProductModel>} A promise to a ProductModel See {@link ProductModel}
 */
exports.getProductByID =  (ID, type=1) =>{
    return new Promise((resolve, reject)=> {
        request({
                url:config.baseURL+'products/product_search?id='+ID+'&secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    reject({error:error});
                } else {
                    let product=JSON.parse(response.body);
                    if(product.error!==undefined){
                        reject({error:product.error});
                    }
                    else{
                        if(type===0)
                            resolve(product[0])
                        else
                            resolve(new ProductModel(product[0]));
                    }
                }
            });
    });
}
