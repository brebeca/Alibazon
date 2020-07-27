const chai= require('chai'),
    chaiHttp= require('chai-http'),
    server = require('../../app'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET');

chai.should();
chai.use(chaiHttp);


describe('Cart Controller test',()=>{

    it('GET /cart/mycart -> code 200', (done)=>{
        chai.request(server)
            .get('/cart/mycart')
            .set('Cookie', 'token='+secretData.aToken)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it('GET /cart/mycart -> code 401', (done)=>{
        chai.request(server)
            .get('/cart/mycart')
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(401);
                done();
            })
    });

    it('POST /cart/add -> code 200', (done)=>{
        chai.request(server)
            .get('/cart/mycart')
            .set('Cookie', 'token='+secretData.aToken)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it('POST /cart/add -> code 401', (done)=>{
        chai.request(server)
            .post('/cart/add')
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(401);
                done();
            })
    });

})