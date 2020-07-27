const chai= require('chai'),
    chaiHttp= require('chai-http'),
    server = require('../../app'),
    dataForTests=require('../test-data');


chai.should();
chai.use(chaiHttp);

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
            .get('/subcategory/'+ dataForTests.subcategory+'/'+dataForTests.notAid)
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
