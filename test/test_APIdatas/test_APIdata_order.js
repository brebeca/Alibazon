const chai= require('chai'),
    chaiHttp= require('chai-http'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET');

chai.should();
chai.use(chaiHttp);

describe('Cart populate ',  function () {
    var cartItems=[];
    before(async ()=>{
        await dataForTests.cartAPI.add('cart', dataForTests.productID, dataForTests.variantID, '1', secretData.aToken);
        cartItems = await dataForTests.cartAPI.get('cart', secretData.aToken);
    })

    describe("API data CART/Wishlist tests",  () => {

        it(" POST order ", (done) => {
            dataForTests.orderAPIfunctions.add('1', cartItems, secretData.aToken)
                .then((response) => {
                    chai.expect(response).to.have.property('message');
                    chai.expect(response.message).to.eql("Order added");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done(new Error('Method  rejected.'))
                })

        });

       /* it("POST order with empty cart", (done) => {
            dataForTests.orderAPIfunctions.add(1, cartItems, secretData.aToken, secretData.baseURL, secretData.secretKEY)
                .then((response) => {
                    console.log((response))
                    done(new Error('Method expected to reject.'))
                })
                .catch((err) => {
                   // console.log(err);
                    chai.expect(response).to.have.property('error');
                    chai.expect(response.message).to.eql("There are no items in your cart to create the order");
                    done();
                })

        });*/
    });

})