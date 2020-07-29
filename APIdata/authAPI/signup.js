/**
 * signUpAPI module.
 * @module APIdata/authAPI/signup
 */

const request = require('request');
const config = require('../../config');
const {UserModel} = require('../../utils/models/userModel');

/**
 * Executes signUp
 * @param {string} email -User email
 * @param {string} password  User password
 * @param  {string} name    User name
 * @returns {Promise<UserModel>} A promise to a UserModel See {@link UserModel}
 */
exports.signUp = (email, password, name) => {
    return new Promise((resolve, reject) => {
        request.post(config.baseURL + 'auth/signup',
            {
                json: {
                    name:name,
                    email: email,
                    password: password,
                    secretKey:config.secretKEY
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
                            reject({error: 'missing body data'});
                        }
                    }
                }
            });
    });
}
