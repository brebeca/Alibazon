const request = require('request');
const config = require('../config');

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
            console.log('a primit raspuns');
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
