const chai= require('chai'),
    dataForTests=require('./test-data');

describe("mail confirmation tests", ()=> {

    it(" send email test ",  (done) => {
        dataForTests.sendEmail("birleanurebeca@yahoo.com","rebeca",'1234')
            .then((response)=>{
                console.log(response)
                done()
            })
            .catch((err)=>{
                console.log(err);
                done( new Error('Rejected '))
            })
    });
})