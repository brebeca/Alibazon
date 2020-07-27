const chai= require('chai'),
    {AccountModel}=require('../../utils/models/accountModel'),
    connection=require('../../utils/database-utils/db-connection').connect;
    dataForTests=require('../test-data');
var account;



describe("database tests", ()=> {

    before( function (done) {
        connection(done);
        account= new AccountModel(dataForTests.userSignup.name, dataForTests.userSignup.email, dataForTests.utils.getARandomCode()
            , dataForTests.userSignup.password);
    });

    after(function (done) {
        dataForTests.databse.deleteAccount(account.code, account.email)
            .then(()=>done()).catch(()=>done());
    })

    describe(' insertion and verifying confirmation to return false  ',()=> {

        it(" insert account ", (done) => {
            dataForTests.databse.insertAccount(account)
                .then((response) => {
                    chai.expect(response).to.have.property('message');
                    chai.expect(response['message']).to.eql('Inserted');
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(new Error('rejected '))
                })
        });

        it(" verify account code -> return false", (done) => {
            dataForTests.databse.verifyAccount(account.code, account.email)
                .then((response) => {
                    chai.expect(response).to.be.true;
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(new Error('rejected '))
                })
        });

        it(" verify email confirmed -> return false", (done) => {
            dataForTests.databse.isEmailConfirmed(account.email)
                .then((response) => {
                    chai.expect(response).to.be.false;
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done(new Error('rejected '))
                })
        });
    });
    describe(' updating and verifying email confirmation to return true  ',()=> {
        it(" update to email confirmation",  (done ) => {
            dataForTests.databse.confirmeEmail(account.email)
                .then((response)=>{
                    chai.expect(response).to.be.true;
                    done();
                })
                .catch(err=> {
                    console.log(err);
                    done(new Error('rejected '))
                })
        });

        it(" verify account code -> return true ",  (done ) => {
            dataForTests.databse.verifyAccount(account.code, account.email)
                .then((response)=>{
                    chai.expect(response).to.be.true;
                    done();
                })
                .catch(err=> {
                    console.log(err);
                    done(new Error('rejected '))
                })
        });



        it(" verify email confirmed -> return true",  (done ) => {
            dataForTests.databse.isEmailConfirmed(account.email)
                .then((response)=>{
                    chai.expect(response).to.be.true;
                    done();
                })
                .catch(err=> {
                    console.log(err);
                    done(new Error('rejected '))
                })
        });
    })

})