
const config= require('../config');
const request   = require('request');

exports.getSubcategories=  (parentID) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: 'https://osf-digital-backend-academy.herokuapp.com/api/categories/parent/'+parentID+'?secretKey=$2a$08$6Hk6nD18tXEy3n8Pmre6/u55BSnCpQ8PWRkx9uci7I49XeOPIjSfW',
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    //TO DO
                    reject({error:error});
                } else {
                    //TO DO : check if response in empty array <=> no such parent category
                    let body=JSON.parse(response.body);
                    //console.log(body);
                    if(body.error!==undefined)
                        reject({error:body.error});
                    resolve(body);
                }
            });
    });
}

exports.getCurrentCategoryParent =(subcategoryID) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: config.baseURL+'categories/'+subcategoryID+'?secretKey='+config.secretKEY,
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    //TO DO
                    reject({error:error});
                } else {
                    //TO DO : check if response in empty array <=> no such category
                    let body=JSON.parse(response.body);
                    //console.log(body);
                    if(body.error!==undefined)
                        reject({error:body.error});
                    resolve(body.parent_category_id);
                }
            });
    });
}