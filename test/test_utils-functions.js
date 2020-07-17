const chai= require('chai'),
    dataForTests=require('./test-data');

describe("utils functions tests", ()=> {

    it(" should return the path of an image  ",  () => {
        const path=dataForTests.utils.getImgPath(dataForTests.product,0,dataForTests.size);

        chai.expect(path).to.be.an('string');
        chai.expect(path).to.have.string(dataForTests.size);
    });

    it(" verify if not  iterable  ",()=>{
        chai.expect(dataForTests.utils.isIterable(dataForTests.notIterable)).to.be.false;
    })

    it(" verify if iterable ",()=>{
        chai.expect(dataForTests.utils.isIterable(dataForTests.iterable)).to.be.true;
    })
})