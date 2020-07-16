const chai= require('chai'),
    chaiHttp= require('chai-http'),
    server = require('../app'),
    loginAPI= require('../APIdata/authAPI/login'),
    signUpAIP= require('../APIdata/authAPI/signup'),
    {userLogin} =require('./useraccount'),
    {userSignup} =require('./useraccount'),
    category='mens-accessories',
    notACategory='not-a-category',
    subcategory='mens-clothing-jackets',
    notAsubcategory='not-a-subcategory',
    id='69309284',
    notAid='not-a-id';

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
            .get('/home/'+ category)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home/category  -> status 404",  (done) => {
        chai.request(server)
            .get('/home/'+ notACategory)
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
            .get('/subcategory/'+subcategory)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /subcategory/:subcategory -> status 404",  (done) => {
        chai.request(server)
            .get('/subcategory/'+notAsubcategory)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 404 (subcategory and product id do not match )",  (done) => {
        chai.request(server)
            .get('/subcategory/'+ subcategory+'/'+id)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 200",  (done) => {
        chai.request(server)
            .get('/subcategory/mens-clothing-dress-shirts/'+id)
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 404",  (done) => {
        chai.request(server)
            .get('/subcategory/'+ subcategory+'/'+notAid)
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
            .send({password:userLogin.password,  email:userLogin.email})
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
            .send({password:userLogin.notapassword,  email:userLogin.notanemail})
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
            .send({password:userLogin.password,  email:userLogin.email, name:userSignup.name})
            .end((err, response)=>{
                if(err)
                    done(err);
                response.should.have.status(400);
                done();
            })
    })

})