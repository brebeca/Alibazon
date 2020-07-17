const request = require('request');
const config = require('../../config');
const userModel = require('../../utils/models/userModel').UserModel;

exports.login = (email, password, baseURL=config.baseURL, secretKey=config.secretKEY) => {
    return new Promise((resolve, reject) => {
        request.post(baseURL + 'auth/signin',
            {
                json: {
                    email: email,
                    password: password,
                    secretKey:secretKey
                }
            },
            function (error, response, body) {
                if (error) {
                    //console.log(error);
                    reject({error: error});
                } else {
                    //console.log(body);
                    if (response.statusCode === 400)
                        reject({error: body.error});
                    else {
                        if (body.token !== undefined && body.user.name !== undefined && body.user.createdAt !== undefined
                            && body.user.email !== undefined) {
                            resolve(new userModel(body.user.name, body.user.email, body.token, body.user.createdAt));
                        } else {
                            reject({error: 'missing body data'});
                        }
                    }
                }
            }
           );
    });
}
