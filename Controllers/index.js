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
exports.home = function(req, res) {
  let active="cat1";
  const breadcrumbs=[
    {
      title:"home",
      link :"/"
    }
  ];
  res.render('index',{page:page,categories: cat, pressed:"cat1", breadcrumbs:breadcrumbs, activeCategory:active, description:'description', subcategories:subcat});
};

exports.subcategory= function(req, res) {
  let active=req.params.category;
  const breadcrumbs=[
    {
      title:"home",
      link :"/"
    }
  ];
  res.render('index',{page:page,categories: cat, pressed:req.params.category, breadcrumbs:breadcrumbs, activeCategory:active, description:'description', subcategories:subcat});
};

