

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
                    //console.log(JSON.parse(response.body));
                    resolve(JSON.parse(response.body));
                }
            });
    });
}

exports.getCurrentCategoryParent =(subcategoryID) =>{
    return new Promise((resolve, reject)=> {
        request({
                url: 'https://osf-digital-backend-academy.herokuapp.com/api/categories/'+subcategoryID+'?secretKey=$2a$08$6Hk6nD18tXEy3n8Pmre6/u55BSnCpQ8PWRkx9uci7I49XeOPIjSfW',
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    //TO DO
                    reject({error:error});
                } else {
                    //TO DO : check if response in empty array <=> no such category
                    resolve(JSON.parse(response.body).parent_category_id);
                }
            });
    });
}