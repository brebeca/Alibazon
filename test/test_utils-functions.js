const chai= require('chai');
const utils= require('../utils/utils-functions');
const product= require('./product').product;
const size='large';
const notIterable=true;
const iterable=[1,2,3];
const fs = require('fs')

describe("utils functions tests", ()=> {

    it(" should return the path of an image  ",  () => {
        const path=utils.getImgPath(product,0,size);

        chai.expect(path).to.be.an('string');
        chai.expect(path).to.have.string(size);
    });

    it(" verify if not  iterable  ",()=>{
        chai.expect(utils.isIterable(notIterable)).to.be.false;
    })

    it(" verify if iterable ",()=>{
        chai.expect(utils.isIterable(iterable)).to.be.true;
    })
})