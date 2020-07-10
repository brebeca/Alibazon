
const request   = require('request');

exports.getAllCategories=  () =>{
    return new Promise((resolve, reject)=> {
        request({
                url: 'https://osf-digital-backend-academy.herokuapp.com/api/categories?secretKey=$2a$08$6Hk6nD18tXEy3n8Pmre6/u55BSnCpQ8PWRkx9uci7I49XeOPIjSfW',
                method: 'GET'
            },
            function (error, response) {
                if (error) {
                    //TO DO
                    reject({error:error});
                } else {
                    let categories = JSON.parse(response.body);
                    //TO DO: add the filter criteria in seperate fil
                    let allCategoriesLevel2 = categories.filter(function (item) {
                        return item.parent_category_id === 'mens' || item.parent_category_id === 'womens';
                    });
                    resolve( allCategoriesLevel2);
                }
            });
    });
}
exports.getCurrentCategory= (all, id)=>{
    return all.filter(obj => {
        return obj.id === id;
    })[0];
}