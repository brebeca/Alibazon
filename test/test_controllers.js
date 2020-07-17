const chai= require('chai'),
    chaiHttp= require('chai-http'),
    server = require('../app'),
    dataForTests=require('./test-data'),
    secretData=require('./SECRET'),
    id='69309284';


chai.should();
chai.use(chaiHttp);

describe("Endpoints index tests", ()=> {

    it(" GET / ",  (done) => {
        chai.request(server)
            .get('/')
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home  -> status 200",  (done) => {
        chai.request(server)
            .get('/home')
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home/category -> status 200",  (done) => {
        chai.request(server)
            .get('/home/'+ dataForTests.category)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home/category  -> status 404",  (done) => {
        chai.request(server)
            .get('/home/'+ dataForTests.notACategory)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(404);
                done();
            })
    });
})

describe("Endpoints products  tests", ()=> {

    it(" GET /subcategory/:subcategory -> status 200",  (done) => {
        chai.request(server)
            .get('/subcategory/'+dataForTests.subcategory)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /subcategory/:subcategory -> status 404",  (done) => {
        chai.request(server)
            .get('/subcategory/'+dataForTests.notAsubcategory)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 404 (subcategory and product id do not match )",  (done) => {
        chai.request(server)
            .get('/subcategory/'+ dataForTests.subcategory+'/'+id)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 200",  (done) => {
        chai.request(server)
            .get('/subcategory/'+dataForTests.subcategory+'/'+dataForTests.id)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 404",  (done) => {
        chai.request(server)
            .get('/subcategory/'+ dataForTests.subcategory+'/'+dataForTests.notAid)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(404);
                done();
            })
    });
})

describe('Auth Controllers tests ',()=>{

    it('GET /auth/login', (done)=>{
        chai.request(server)
            .get('/auth/login')
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it('GET /auth/signup', (done)=>{
        chai.request(server)
            .get('/auth/signup')
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it('POST /auth/login -> 200',(done)=>{
        chai.request(server)
            .post('/auth/login')
            .send({password:dataForTests.userLogin.password,  email:dataForTests.userLogin.email})
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it('POST /auth/login -> 400',(done)=>{
        chai.request(server)
            .post('/auth/login')
            .send({password:dataForTests.userLogin.notapassword,  email:dataForTests.userLogin.notanemail})
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(400);
                done();
            })
    });

    it('POST /auth/signup -> 400', (done)=>{
        chai.request(server)
            .post('/auth/signup')
            .send({password:dataForTests.userLogin.password,  email:dataForTests.userLogin.email,
                name:dataForTests.userSignup.name})
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(400);
                done();
            })
    })

})

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

    it('POST /cart/add -> code 400', (done)=>{
        chai.request(server)
            .get('/cart/mycart')
            .set('Cookie', 'token='+secretData.aToken)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(400);
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