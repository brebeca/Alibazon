var express = require('express');
var router = express.Router();
const page='category-menu-option';
const cat =["cat1","cat2","cat3"];
const path=["home"];
const subcat=[
    {
      title:'subcat1',
      description:'description1',
      id:1
    },
  {
    title:'subcat2',
    description:'description2',
    id:2
  },
  {
    title:'subcat3',
    description:'description1',
    id:3
  }
]

router.get('/', function(req, res, next) {
  let active="cat1";
  res.render('index',{page:page,categories: cat, pressed:"cat1", breadcrumbs:path, activeCategory:active, description:'description', subcategories:subcat});
});

router.get('/home/:category', function(req, res, next) {
  let active=req.params.category;
  res.render('index',{page:page,categories: cat, pressed:req.params.category, breadcrumbs:path, activeCategory:active, description:'description', subcategories:subcat});
});

module.exports = router;
