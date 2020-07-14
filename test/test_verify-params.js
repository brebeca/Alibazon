const chai= require('chai');
const category='mens-accessories';
const subcategory = 'mens-accessories-ties';
const notAsubcategory = 'not-a-subcategory';
const notAcategory = 'not-a-category';
const productID='69309284';
const verifyFunctions=require('../utils/verify-params');
const notAproductID='not-a-product-id';
const res={};

describe("API data tests", ()=> {

    it(" verify subcategory ", async () => {
        chai.expect(await verifyFunctions.checksubcategory(subcategory,res)).to.be.true;
    });

    it(" verify NONsubcategory", async () => {
        chai.expect(await verifyFunctions.checksubcategory(notAsubcategory,res)).to.be.false;
    });

    it(" verify category ", async () => {
        chai.expect(await verifyFunctions.checkcategory(category,res)).to.be.true;
    });

    it(" verify NONsubcategory", async () => {
        chai.expect(await verifyFunctions.checksubcategory(notAcategory,res)).to.be.false;
    });

    it(" verify product ID", async () => {
        chai.expect(await verifyFunctions.checkproductID(productID,res)).to.be.true;
    });

    it(" verify wrong product id ", async () => {
        chai.expect(await verifyFunctions.checkproductID(notAproductID,res)).to.be.false;
    });

});
