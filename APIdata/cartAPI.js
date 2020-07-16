const request = require('request');
const config = require('../config');
const {ProductModel}=require('../utils/models/productModel');

exports.add = (productID, variantID, quantity='1',token) => {

    return new Promise((resolve, reject) => {
        const options = {
            url: config.baseURL + '/cart/addItem',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'Authorization':' Bearer '+token
            },
            json: true,
            body:
                {
                        'productId': productID,
                        'variantId': variantID,
                        'quantity':quantity,
                        'secretKey':config.secretKEY
                }

        };
        request.post(options,
            function (error, response, body) {
                if (error) {
                    reject({error: error});
                } else {
                    if (response.statusCode !== 200)
                        reject({error: 'error'});
                    else {
                       resolve({message:"Product added"})
                    }
                }
            }
        );
    });
}

exports.get=async function(token) {
    return new Promise((resolve, reject) => {
        const options = {
            url: config.baseURL + 'cart?secretKey='+config.secretKEY,
            method: 'GET',
            headers: {
                'Authorization':' Bearer '+token
            }
        };

        request.get(options,function (error, response, body) {
            if (error) {
                reject({error: error});
            } else {
                if (response.statusCode !== 200)
                    reject({error: 'error'});
                else {
                   // console.log(JSON.parsebody);
                    body= JSON.parse(body);
                    resolve(body.items);

                }
            }
        });

    });

}
