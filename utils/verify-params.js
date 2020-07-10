const subcategories=[
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
const categories =["cat1","cat2","cat3"];

const products=[
    {
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
    },
    {
        title:'product title',
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
    }
    ];

/* Checks if the subcategory in the parmas exists*/
exports.checkParameters= function(req, res, next) {
    try {
        if(req.params.category!==undefined && false===varifyCategory(req.params.category,res) ){
            console.log('Invalid category name :'+req.params.category);
            throw 'Invalid category name';
        }
        next();
    } catch (e) {
        res.status(404);
        res.send('Page not fond');
    }
};


function varifySubcategory(subcategory) {
   subcategories.forEach((item, index)=>{
       if(item.title===subcategory){
           res.locals.subcategory=item;
           return true;
       }
   });
   return false;
 }

function varifyCategory(category, res) {
     console.log(category);
     //request for all categories for navbar+ and check the category in the request params
    let allCategories=categories;//will replace with a function that will return all the categories
    allCategories.forEach((item, index)=>{
        if(item===category){
            res.locals.category=category;
            console.log( res.locals.category);
            res.locals.allCategories=allCategories;
            console.log(res.locals.allCategories);
            console.log('returneaza true');
            return true;
        }
    });
    console.log('returneaza flase');
    return false;
}

function varifyProductID(id) {
    products.forEach((item, index)=>{
        if(item.id===id){
            res.locals.product=item;
            return true;
        }
    });
    return false;
}