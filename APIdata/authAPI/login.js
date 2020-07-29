/**
 * loginAPI module.
 * @module APIdata/authAPI/login
 */

const request = require('request');
const config = require('../../config');
const userModel = require('../../utils/models/userModel').UserModel;


/**
 * Executes login
 * @param {string} email - User email
 * @param {string} password -User password
 * @returns {Promise<UserModel>} A promise to a UserModel See {@link UserModel}
 */
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        request.post(config.baseURL + 'auth/signin',
            {
                json: {
                    email: email,
                    password: password,
                    secretKey:config.secretKE
                }
            },
            function (error, response, body) {
                if (error) {
                    reject({error: error});
                } else {
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
