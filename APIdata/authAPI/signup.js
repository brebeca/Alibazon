const request = require('request');
const config = require('../../config');
const {UserModel} = require('../../utils/models/userModel');


exports.signUp = (email, password, name, baseURL=config.baseURL, secretKey=config.secretKEY) => {
    return new Promise((resolve, reject) => {
        request.post(baseURL + 'auth/signup',
            {
                json: {
                    name:name,
                    email: email,
                    password: password,
                    secretKey:secretKey
                }
            },
            function (error, response, body) {
                if (error) {
                    reject({error: error});
                } else {
                    if (response.statusCode===400)
                        reject({error: body.error});
                    else {
                        if (body.token !== undefined && body.user.name !== undefined && body.user.createdAt !== undefined
                            && body.user.email !== undefined ) {
                            resolve(new UserModel(body.user.name,  body.user.email, body.token, body.user.createdAt));
                        } else {
                            //console.log(body);
                            reject({error: 'missing body data'});
                        }
                    }
                }
            });
    });
}
