const config= require('../config');
const request   = require('request');

/**
 * makes GET request to get the subcategories for the parent category parentID
 * in case of error calls reject
 * parses the body and calls resolve
 * @param parentID           the parent Id of the subcategories
 * @param baseURL
 * @param secretKey
 * @returns {Promise<unknown>}
 */
exports.getSubcategories=  (parentID, baseURL=config.baseURL, secretKey=config.secretKEY) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: baseURL+'categories/parent/'+parentID+'?secretKey='+secretKey,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    //console.log(error);
                    reject({error:error});
                } else {
                    let body=JSON.parse(response.body);
                    //console.log(body);
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
 * @param baseURL
 * @param secretKey
 * @returns {Promise<unknown>}
 */
exports.getCurrentCategoryParent =(subcategoryID, baseURL=config.baseURL, secretKey=config.secretKEY) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: baseURL+'categories/'+subcategoryID+'?secretKey='+secretKey,
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