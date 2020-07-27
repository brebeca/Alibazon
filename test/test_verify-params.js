const chai= require('chai');
const verifyFunctions=require('../utils/verify-middleware/verify-params'),
    dataForTests=require('./test-data'),

    secret=require('./SECRET');

describe("API data tests", ()=> {

    it(" verify subcategory ", async () => {
        chai.expect(await verifyFunctions.checksubcategory(dataForTests.subcategory,dataForTests.res,secret.baseURL,secret.secretKEY))
            .to.be.true;
    });

    it(" verify NONsubcategory", async () => {
        chai.expect(await verifyFunctions.checksubcategory(dataForTests.notAsubcategory,dataForTests.res,secret.baseURL,secret.secretKEY))
            .to.be.false;
    });

    it(" verify category ", async () => {
        chai.expect(await verifyFunctions.checkcategory(dataForTests.category,dataForTests.res,secret.baseURL,secret.secretKEY))
            .to.be.true;
    });

    it(" verify NONsubcategory", async () => {
        chai.expect(await verifyFunctions.checksubcategory(dataForTests.notAid,dataForTests.res,secret.baseURL,secret.secretKEY))
            .to.be.false;
    });

    it(" verify product ID", async () => {
        chai.expect(await verifyFunctions.checkproductID(dataForTests.id,dataForTests.res,dataForTests.parent,secret.baseURL,secret.secretKEY))
            .to.be.true;
    });

    it(" verify wrong product id ", async () => {
        chai.expect(await verifyFunctions.checkproductID(dataForTests.notAid,dataForTests.subcategory,dataForTests.res,secret.baseURL,secret.secretKEY))
            .to.be.false;
    });

});
