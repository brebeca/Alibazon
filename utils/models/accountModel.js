/**
 * Class to describe an account model
 */
class AccountModel {

    code;
    email;
    password;
    name;
    confirmed;

    /**
     * Constructs the class
     * @param {string}name user name
     * @param {string}email user email
     * @param {string|number}code confirmation code for the account
     * @param {string}password user password
     */
    constructor(name, email, code, password) {
        this.confirmed=false;
        this.name = name;
        this.email = email;
        this.password= password;
        this.code=code;
    }

}
exports.AccountModel=AccountModel;