/**
 * categoriesAPI module.
 * @module APIdata/get-categories
 */

const request   = require('request');
const config= require('../config');
const utils=require('../utils/utils-functions');

/**
 * Gets the main categories
 * @returns {Promise<Array>} A promise to an array of categories
 */
exports.getAllCategories =  ( ) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'categories?secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    reject({error:error});
                } else {
                    let categories = JSON.parse(response.body);
                    if(categories.error!==undefined)
                        reject({ error:categories.error });
                    else {
                        resolve(utils.getTheMainCategories(categories));
                    }
                }
            });
    });
}



/**
 * searches in the array all for the object with the id received in the function params
 * @param all array of category objects
 * @param id the id for the search
 * @returns {*} the element with the the id
 */
exports.getCurrentCategory= (all, id)=>{
    return all.filter(obj => {
        return obj.id === id;
    })[0];
}

/**
 * Gets the parent category of the currentCategorie
 *  @async
 * @param currentCategorie - the current category
 * @returns {Promise<String>} A promise to the name of the parent category
 */
exports.getBreadCrumbsCategories=async ( currentCategorie) =>{
    return new Promise((resolve, reject)=> {
             request({
                    url: config.baseURL+'categories/'+currentCategorie+'?secretKey='+config.secretKEY,
                    method: 'GET'
                },
                function (error, response) {
                    if (error) {
                        reject({error:error});
                    } else {
                        let categories = JSON.parse(response.body);
                        if(categories.error!==undefined)
                            reject({ error:categories.error });
                        else {
                            resolve(categories.parent_category_id);
                        }
                    }
                });
    });
}