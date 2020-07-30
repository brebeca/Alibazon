const chai= require('chai'),
    chaiHttp= require('chai-http'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET');

chai.should();
chai.use(chaiHttp);


describe("API data categories and products.js tests", ()=>{

    it(" all categories of level 2 in an array ",async ()=>{
       dataForTests.categoryAPIfunctions.getAllCategories(secretData.baseURL,secretData.secretKEY)
           .then((allCAtegories)=>{
               chai.expect(allCAtegories).to.be.an('array');
               chai.expect(allCAtegories).to.be.not.empty;
           })

    });

    it(" products.js for a subcategory - existing subcategory- in an array of objects with property img_path", (done)=> {
        dataForTests.productsAPIfunctions.getProductsForSubcategory(dataForTests.subcategory,1,
            secretData.baseURL,secretData.secretKEY)
            .then((products) => {
                chai.expect(products).to.be.an('array');
                chai.expect(products).to.be.not.empty;
                products.forEach((item) => {
                    chai.expect(item).to.have.property('img_path');
                });
                done();
            }).catch(err => done(new Error(err.error)));
    });

    it(" products.js for a subcategory -  NONexisting subcategory", (done)=> {
        dataForTests.productsAPIfunctions.getProductsForSubcategory(dataForTests.notAsubcategory,
            secretData.baseURL,secretData.secretKEY)
            .then((response)=>{
               chai.expect(response).to.be.an('array');
               chai.expect(response).to.be.empty;
               done();
            }).catch(err =>{
            done(err);
        });
    });

    it(" get product by id - existing id ", (done)=> {
        dataForTests.productsAPIfunctions.getProductByID(dataForTests.productID,1,
            secretData.baseURL,secretData.secretKEY)
            .then((product) => {
                chai.expect(product).to.have.property('imagePath');
                done();
            }).catch(err => done(new Error('Method reject. '+ err)));
    });

    it(" get product by id - NONexisting id ", (done)=> {
        dataForTests.productsAPIfunctions.getProductByID(dataForTests.notAid,
            secretData.baseURL,secretData.secretKEY)
            .then(()=>{
                done(new Error('Expected method to reject.'));
            }).catch(err => {
            chai.expect(err).to.have.property('error');
            done();
        });
    });

    it(" get subcategories by parentID- existing parentID ", (done)=> {
        dataForTests.subcategoryAPIfunctions.getSubcategories(dataForTests.parentID,
            secretData.baseURL,secretData.secretKEY)
            .then((subcategories) => {
                chai.expect(subcategories).to.be.an('array');
                chai.expect(subcategories).to.be.not.empty;
                done();
            }).catch(err => done(new Error('Method reject.')));
    });

    it(" get subcategories by parentID -NONexisting parentID ", (done)=> {
        dataForTests.subcategoryAPIfunctions.getSubcategories(dataForTests.notAParentID,
            secretData.baseURL,secretData.secretKEY)
            .then(() => {
                done(new Error('Expected method to reject.'));
            }).catch(err => {
            chai.expect(err).to.have.property('error');
            done();
        });
    });

    it(" get subcategory s  parent - existing subcategory ", (done)=> {
        dataForTests.subcategoryAPIfunctions.getCurrentCategoryParent(dataForTests.subcategory,
            secretData.baseURL,secretData.secretKEY)
            .then((parent) => {
                chai.expect(parent).to.be.an('string');
                done();
            }).catch(err => done(err));
    });

    it(" get subcategory s  parent -NONexisting subcategory ", (done)=> {
        dataForTests.subcategoryAPIfunctions.getCurrentCategoryParent(dataForTests.notAsubcategory,
            secretData.baseURL,secretData.secretKEY)
            .then(() => {
                done(new Error('Expected method to reject.'));
            }).catch(err => {
            chai.expect(err).to.have.property('error');
            done();
        });
    });

});

describe('get parent category for breadcrumbs', ()=>{

    it("GET parent category of existing category",(done)=>{
        dataForTests.categoryAPIfunctions.getBreadCrumbsCategories(dataForTests.subcategory)
            .then((response) => {
                chai.expect(response).to.be.a('string');
                chai.expect(response).eql('mens-clothing');
                done();
            }).catch(err => {
                console.log(err);
                done(new Error('Rejected.'));
            });

    })
})








