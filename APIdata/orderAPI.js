const request = require('request');
const config = require('../config');

/**
 * Makes an order
 * @param {string}paymentID the payment id
 * @param {Array}items  the list of items for the order
 * @param {string}token   users JWT
 * @returns {Promise<Object>} A primise to an object with a success message
 */
exports.add = (paymentID,items,token) => {

    return new Promise((resolve, reject) => {
        const options = {
            url: config.baseURL + 'orders',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'Authorization':' Bearer '+token
            },
            json: true,
            body:
                {
                    "paymentId": paymentID,
                    "address": "address",
                    "items": items,
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
                        resolve({message:"Order added"})
                    }
                }
            }
        );
    });
}
