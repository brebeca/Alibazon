const chai= require('chai'),
    chaiHttp= require('chai-http'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET');

chai.should();
chai.use(chaiHttp);

describe("API data AUTH tests ", ()=> {

    it(" Login test real acount ", (done ) => {
        dataForTests.loginAPI.login(dataForTests.userLogin.email, dataForTests.userLogin.password,
            secretData.baseURL,secretData.secretKEY)
            .then((response)=>{
                chai.expect(response).to.be.instanceOf(dataForTests.UserModel);
                done();
            })
            .catch(err => done(new Error('Method  rejected.')));
    });

    it(" Login test nonexisting acount ",  (done ) => {
        dataForTests.loginAPI.login(dataForTests.userLogin.notanemail, dataForTests.userLogin.notapassword,
            secretData.baseURL,secretData.secretKEY)
            .then((response)=>{
                done(new Error('Expected method to reject.'));
            })
            .catch(err => done());
    });

    it(" SignUp test existing account ",  (done ) => {
        dataForTests.signUpAIP.signUp(dataForTests.userSignup.email, dataForTests.userSignup.password, dataForTests.userSignup.name,
            secretData.baseURL,secretData.secretKEY)
            .then((response)=>{
                done(new Error('Expected method to reject.'));
            })
            .catch(err => done());
    });

})
