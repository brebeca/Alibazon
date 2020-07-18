const request = require('request');
const config = require('../config');
const {ProductModel}=require('../utils/models/productModel');

exports.add = (type,productID, variantID, quantity='1',token, baseURL=config.baseURL, secretKey=config.secretKEY) => {

    return new Promise((resolve, reject) => {
        const options = {
            url: baseURL + '/'+type+'/addItem',
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
                        'secretKey':secretKey
                }

        };
        request.post(options,
            function (error, response, body) {
                if (error) {
                    reject({error: error});
                } else {

                    if (response.statusCode !== 200)
                        reject({error: body.error});
                    else {
                       resolve({message:"Product added"})
                    }
                }
            }
        );
    });
}

exports.get=async function(type,token, baseURL=config.baseURL, secretKey=config.secretKEY) {
    return new Promise((resolve, reject) => {
        const options = {
            url: baseURL + type+'?secretKey='+secretKey,
            method: 'GET',
            headers: {
                'Authorization':' Bearer '+token
            }
        };

        request.get(options,function (error, response, body) {
            if (error) {
                reject({error: error});
            } else {
                body= JSON.parse(body);
                if (response.statusCode !== 200)
                    if('There is no '+type+' created for this user'===body.error)
                        resolve([]);
                    else
                        reject({error: body.error});
                else {
                    resolve(body.items);
                }
            }
        });
    });
}

exports.delete = (type,productID, variantID,token, baseURL=config.baseURL, secretKey=config.secretKEY) => {

    return new Promise((resolve, reject) => {
        const options = {
            url: baseURL + '/'+type+'/removeItem',
            method: 'DELETE',
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
                    'secretKey':secretKey
                }
        };
        request.delete(options,
            function (error, response, body) {
                if (error) {
                    reject({error: error});
                } else {
                    if (response.statusCode !== 200)
                        reject({error: body.error});
                    else {
                        resolve({message:"Product deleted"})
                    }
                }
            }
        );
    });
}