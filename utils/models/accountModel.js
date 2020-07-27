class AccountModel {

    code;
    email;
    password;
    name;
    confirmed;

    constructor(name, email, code, password) {
        this.confirmed=false;
        this.name = name;
        this.email = email;
        this.password= password;
        this.code=code;
    }

}
exports.AccountModel=AccountModel;