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

    it(" breadcrumb array for subcategory pages  ",async ()=>{
        let breadcrumbs= await dataForTests.breadCrumbsFunctions.breadcrumbsSubcategory(dataForTests.subcategory);
        chai.expect(breadcrumbs.path).to.be.an('array');
        chai.expect(breadcrumbs.path[0].title ).eql('home');
        chai.expect(breadcrumbs.path[0].link ).eql('/');

        breadcrumbs.path.forEach((item, index)=>{
            if(index!==0)
                chai.expect(item.link).match(/home/);
        })
    })

})