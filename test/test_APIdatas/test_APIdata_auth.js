const chai= require('chai'),
    chaiHttp= require('chai-http'),
    dataForTests=require('../test-data');

chai.should();
chai.use(chaiHttp);

describe("API data AUTH tests ", ()=> {

    it(" Login test real acount ", (done ) => {
        dataForTests.loginAPI.login(dataForTests.userLogin.email, dataForTests.userLogin.password)
            .then((response)=>{
                chai.expect(response).to.be.instanceOf(dataForTests.UserModel);
                done();
            })
            .catch(err => {
                console.log(err);
                done(new Error('Method  rejected.'))
            });
    });

    it(" Login test nonexisting acount ",  (done ) => {
        dataForTests.loginAPI.login(dataForTests.userLogin.notanemail, dataForTests.userLogin.notapassword)
            .then((response)=>{
                done(new Error('Expected method to reject.'));
            })
            .catch(err => done());
    });

    it(" SignUp test existing account ",  (done ) => {
        dataForTests.signUpAIP.signUp(dataForTests.userSignup.email, dataForTests.userSignup.password, dataForTests.userSignup.name)
            .then((response)=>{
                done(new Error('Expected method to reject.'));
            })
            .catch(err => done());
    });

})
