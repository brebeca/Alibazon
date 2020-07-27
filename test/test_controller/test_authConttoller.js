const chai= require('chai'),
    chaiHttp= require('chai-http'),
    server = require('../../app'),
    dataForTests=require('../test-data'),
    secretData=require('../SECRET'),
    id='69309284';


chai.should();
chai.use(chaiHttp);


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
