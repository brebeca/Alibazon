
const request   = require('request');
const config= require('../config');
const main= require('../utils/main-categories');

exports.getAllCategories=  () =>{
    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'categories?secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    //TO DO
                    reject({error:error});
                } else {
                    let categories = JSON.parse(response.body);

                    if(categories.error!==undefined)
                        reject({error:categories.error});
                    else {
                        //TO DO: add the filter criteria in seperate fil
                        let allCategoriesLevel2 = categories.filter(function (item) {
                            if (item.parent_category_id === 'mens' || item.parent_category_id === 'womens') {
                                item.name = item.parent_category_id.charAt(0).toUpperCase() + item.parent_category_id.slice(1) + ' ' + item.name;
                                return item;
                            }
                        });
                        main.mainCategories=allCategoriesLevel2;
                        resolve(allCategoriesLevel2);
                    }
                }
            });
    });
}
exports.getCurrentCategory= (all, id)=>{
    return all.filter(obj => {
        return obj.id === id;
    })[0];
}