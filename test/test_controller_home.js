const chai= require('chai'),
    chaiHttp= require('chai-http'),
    server = require('../app'),
    dataForTests=require('./test-data'),
    secretData=require('./SECRET'),
    id='69309284';


chai.should();
chai.use(chaiHttp);

describe("Endpoints index tests", ()=> {

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
