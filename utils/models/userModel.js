/**
 * class to describe a user info
 */
class UserModel {

    name;
    email;
    token;
    registerData;

    /**
     *
     * @param {string} name User name
     * @param {string}email  User email
     * @param {string}token  User JTW
     * @param {string}data   User signUp date
     */
    constructor(name, email, token, data) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.registerData=data;
    }

}
exports.UserModel=UserModel;