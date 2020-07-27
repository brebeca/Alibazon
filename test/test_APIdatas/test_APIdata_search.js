const chai= require('chai'),
    chaiHttp= require('chai-http'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET');

chai.should();
chai.use(chaiHttp);


describe('API data SEARCH tests',()=>{

    it("search -> existing word ",(done)=>{
        dataForTests.productsAPIfunctions.getProductsSearch(dataForTests.searchKeyWord)
            .then((result)=>{
                chai.expect(result).to.be.an('array');
                chai.expect(result).to.be.not.empty;
                done();
            })
            .catch((err)=>{
                done(Error('Rejected'+err));
            })
    });

    it("search -> not existing word ",(done)=>{
        dataForTests.productsAPIfunctions.getProductsSearch(dataForTests.searchNonExistingKeyWord)
            .then((result)=>{
                chai.expect(result).to.be.an('array');
                chai.expect(result).to.be.empty;
                done();
            })
            .catch(()=>{
                done(Error('Rejected'));
            })
    });

})