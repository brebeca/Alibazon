
const page='subcategory-page';
const cat =["cat1","cat2","cat3"];
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
];

const product={
    title:'product title',
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
};



exports.subcategoryProductsPage =  function(req, res, next) {
    //TO DO : add validation of the subcategory ( maybe another middleware )
    const breadcrumbs=[
        {
            title:"home",
            link :"/"
        }
    ];
    let active=req.params.subcategory;
    try{
        res.render('index',{page:page, categories: cat, pressed:'', breadcrumbs:breadcrumbs, activeCategory:active, description:'description', subcategories:subcat});
    }
    catch (e) {
        res.render('')
    }
};

exports.productDetailsPage= function(req, res, next) {
    //TO DO : add validation of the subcategory + product id ( maybe another middleware )
    const breadcrumbs=[
        {
            title:"home",
            link :"/"
        },
        {
            title:req.params.subcategory,
            link:"/subcategory/"+req.params.subcategory
        }
        ];
    let active=product.title;
   // path.push(req.params.subcategory);
    res.render('index', { page:'product-page', categories: cat, pressed:'', breadcrumbs:breadcrumbs, activeCategory:active, description:'description', subcategories:subcat, product:product});
};
