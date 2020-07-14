const config= require('../config');
const request   = require('request');

/**
 * makes GET request to get the subcategories for the parent category parentID
 * in case of error calls reject
 * parses the body and calls resolve
 * @param parentID           the parent Id of the subcategories
 * @returns {Promise<unknown>}
 */
exports.getSubcategories=  (parentID) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'categories/parent/'+parentID+'?secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    reject({error:error});
                } else {
                    let body=JSON.parse(response.body);
                    if(body.error!==undefined||body.length===0)
                        reject({error:body.error});
                    resolve(body);
                }
            });
    });
}


/**
 * makes GET request to get the parent category for the subcategory with thw id subcategoryID
 * in case of error calls reject
 * parses the body and calls resolve on the parent_category_id field of the object
 * @param subcategoryID       the id of the subcategory
 * @returns {Promise<unknown>}
 */
exports.getCurrentCategoryParent =(subcategoryID) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'categories/'+subcategoryID+'?secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    reject({error:error});
                } else {
                    let body=JSON.parse(response.body);
                    if(body.error!==undefined)
                        reject({error:body.error});
                    resolve(body.parent_category_id);
                }
            });
    });
}