const request = require('request');
const config = require('../config');


/**
 * Ads a product to users cart or wishlist
 * @param {string}type - can be 'cart' or 'wishlist'
 * @param {string}productID  the id of the product to be added
 * @param {string}variantID the id of the variant to be added
 * @param {string}quantity the quantity of item to be added
 * @param {string}token  the JWT of the user
 * @returns {Promise<Object>} promise to an object with a success message
 */
exports.add = (type,productID, variantID, quantity='1',token) => {

    return new Promise((resolve, reject) => {
        const options = {
            url: config.baseURL + '/'+type+'/addItem',
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
                        reject({error: body.error});
                    else {
                       resolve({message:"Product added"})
                    }
                }
            }
        );
    });
}


/**
 * Gets the list of items in users cart/ wishlist
 * @param {string}type - can be 'cart' or 'wishlist'
 * @param {string}token  the JWT of the user
 * @returns {Promise<Array>} A promise to an array of products.js
 */
exports.get=async function(type,token) {
    return new Promise((resolve, reject) => {
        const options = {
            url: config.baseURL + type+'?secretKey='+config.secretKEY,
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


/**
 * Deletes an item form users cart/ wishlist
 * @param {string}type - can be 'cart' or 'wishlist'
 * @param {string}productID  the id of the product to be deleted
 * @param {string}variantID the id of the variant to be deleted
 * @param {string}token  the JWT of the user
 * @returns {Promise<Object>} promise to an object with a success message
 */
exports.delete = (type,productID, variantID,token) => {

    return new Promise((resolve, reject) => {
        const options = {
            url:config.baseURL + '/'+type+'/removeItem',
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
                    'secretKey':config.secretKEY
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