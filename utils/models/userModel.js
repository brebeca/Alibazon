class UserModel {

    name;
    email;
    token;
    registerData

    constructor(name, email, token, data) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.registerData=data;
    }

}
exports.UserModel=UserModel;