const request = require('request');
const config = require('../config');

exports.add = (paymentID,items,token, baseURL=config.baseURL, secretKey=config.secretKEY) => {

    return new Promise((resolve, reject) => {
        const options = {
            url: baseURL + 'orders',
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
                        resolve({message:"Order added"})
                    }
                }
            }
        );
    });
}
