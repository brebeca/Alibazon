
const request   = require('request');
const config= require('../config');
const main= require('../utils/main-categories');

/**
 * makes a GET request to get all the category objects
 * in case of error calls reject with the error message
 * filters the category object array to pick the main ones
 * calls resolve with the filtered categories
 * @returns {Promise<unknown>}
 */
exports.getAllCategories=  () =>{
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
                        //main.mainCategories=allCategoriesLevel2;
                        resolve(getTheMainCategoryes(categories));
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
 * filters the main category objects
 * updates the field name adding the parent category capitalized
 * @param categories array of category objects
 * @returns {*} array with the main categories
 */
function  getTheMainCategoryes(categories) {
   categories= categories.filter(function (item) {
        if (item.parent_category_id === 'mens' || item.parent_category_id === 'womens') {
            item.name = item.parent_category_id.charAt(0).toUpperCase() + item.parent_category_id.slice(1) + ' ' + item.name;
            return item;
        }
    });
    return categories;
}