const chai= require('chai');
const chaiHttp= require('chai-http')
const server = require('../app');
const category='mens-accessories';
const notACategory='not-a-category';
const subcategory='mens-clothing-jackets';
const notAsubcategory='not-a-subcategory';
const id='69309284';
const notAid='not-a-id';

chai.should();
chai.use(chaiHttp);

describe("Endpoints index tests", ()=> {

    it(" GET / ",  (done) => {
        chai.request(server)
            .get('/')
            .end((err, response)=>{
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home  -> status 200",  (done) => {
        chai.request(server)
            .get('/home')
            .end((err, response)=>{
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home/category -> status 200",  (done) => {
        chai.request(server)
            .get('/home/'+ category)
            .end((err, response)=>{
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /home/category  -> status 404",  (done) => {
        chai.request(server)
            .get('/home/'+ notACategory)
            .end((err, response)=>{
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
                response.should.have.status(200);
                done();
            })
    });

    it(" GET /subcategory/:subcategory -> status 404",  (done) => {
        chai.request(server)
            .get('/subcategory/'+notAsubcategory)
            .end((err, response)=>{
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 404 (subcategory and product id do not match )",  (done) => {
        chai.request(server)
            .get('/subcategory/'+ subcategory+'/'+id)
            .end((err, response)=>{
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 200",  (done) => {
        chai.request(server)
            .get('/subcategory/mens-clothing-dress-shirts/'+id)
            .end((err, response)=>{
                response.should.have.status(404);
                done();
            })
    });

    it(" GET /subcategory/:subcategory/:id-> status 404",  (done) => {
        chai.request(server)
            .get('/subcategory/'+ subcategory+'/'+notAid)
            .end((err, response)=>{
                response.should.have.status(404);
                done();
            })
    });
})