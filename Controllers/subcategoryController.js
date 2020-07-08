var express = require('express');
var router = express.Router();
const page='subcategory-page';
const cat =["cat1","cat2","cat3"];
const path=["home"];
const subcat=[
    {
        title:'subcat1',
        description:'Lorem ipsum dolor sit amet,\n' +
            'maiores ornare ac fermentum,\n' +
            'imperdiet ut vivamus a, nam\n' +
            'lectus at nunc. Quam euismod\n' +
            'sem, semper ut potenti\n' +
            'pellentesque quisque. In eget\n' +
            'sapien sed, sit duis vestibulum\n',
        id:1,
        image:'70284588_100_0.jpg',
        price:100
    },
    {
        title:'subcat2',
        description:'Lorem ipsum dolor sit amet,\n' +
            'maiores ornare ac fermentum,\n' +
            'imperdiet ut vivamus a, nam\n' +
            'lectus at nunc. Quam euismod\n' +
            'sem, semper ut potenti\n' +
            'pellentesque quisque. In eget\n' +
            'sapien sed, sit duis vestibulum\n',
        id:2,
        image:'70284588_100_0.jpg',
        price:100
    },
    {
        title:'subcat3',
        description:'Lorem ipsum dolor sit amet,\n' +
            'maiores ornare ac fermentum,\n' +
            'imperdiet ut vivamus a, nam\n' +
            'lectus at nunc. Quam euismod\n' +
            'sem, semper ut potenti\n' +
            'pellentesque quisque. In eget\n' +
            'sapien sed, sit duis vestibulum\n',
        id:3,
        image:'70284588_100_0.jpg',
        price:100
    }
]


/* GET users listing. */
router.get('/:subcategory', function(req, res, next) {
    try{
        let active=req.params.subcategory;
        res.render('index',{page:page, categories: cat, pressed:'', breadcrumbs:path, activeCategory:active, description:'description', subcategories:subcat});
    }
    catch (e) {
        res.render('')
    }

});
const product={
    title:'subcat2',
    description:'Lorem ipsum dolor sit amet,\n' +
        'maiores ornare ac fermentum,\n' +
        'imperdiet ut vivamus a, nam\n' +
        'lectus at nunc. Quam euismod\n' +
        'sem, semper ut potenti\n' +
        'pellentesque quisque. In eget\n' +
        'sapien sed, sit duis vestibulum\n',
    id:2,
    image:'70284588_100_0.jpg',
    price:100
}
router.get('/:subcategory/:id', function(req, res, next) {
    let active=req.params.subcategory;
    path.push(req.params.subcategory);
    path.push(product.title);
    res.render('index', { page:'product-page', categories: cat, pressed:'', breadcrumbs:path, activeCategory:active, description:'description', subcategories:subcat, product:product});
});

module.exports = router;