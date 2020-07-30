const chai= require('chai'),
    chaiHttp= require('chai-http'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET');

chai.should();
chai.use(chaiHttp);

describe("API data CART/Wishlist tests",()=>{
    it(" POST cart, add a product to a cart  ",  (done ) => {
        dataForTests.cartAPI.add('cart',dataForTests.productID,dataForTests.variantID,'1',secretData.aToken)
            .then((response)=>{
                chai.expect(response).to.have.property('message');
                chai.expect(response.message).to.eql('Product added');
                done();
            })
            .catch((err)=>{
                //console.log(err);
                done(new Error('Method  rejected.'))
            })
    });

    it(" GET cart for a user", (done)=>{
        dataForTests.cartAPI.get('cart',secretData.aToken)
            .then((response)=>{
                chai.expect(response).to.be.an('array');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done(new Error('Method  rejected.'))
            })
    });

    it(" GET cart for a user with wrong token", (done)=>{
        dataForTests.cartAPI.get('cart',dataForTests.notAid)
            .then((response)=>{
                done(new Error('Expected to fail.'))
            })
            .catch((err)=>{
               // console.log(err);
                done();
            })
    });

    it("POST cart, add product to NONexisting cart ", (done)=>{
        dataForTests.cartAPI.add('cart',dataForTests.productID,dataForTests.variantID,1,dataForTests.notAid)
            .then((response)=>{
                done(new Error('Method  rejected.'));
            })
            .catch((err)=>{
               // console.log(err);
                chai.expect(err).to.have.property('error');
                chai.expect(err.error).to.eql('Invalid Token');
                done();
            })
    });

    it(" DELETE cart ,remove a product   ",  (done ) => {
        dataForTests.cartAPI.delete('cart',dataForTests.productID,dataForTests.variantID,secretData.aToken)
            .then((response)=>{
                chai.expect(response).to.have.property('message');
                //console.log(response);
                chai.expect(response.message).to.eql('Product deleted');
                done();
            })
            .catch((err)=>{
                //console.log(err);
                done(new Error('Method  rejected.'))
            })
    });
})