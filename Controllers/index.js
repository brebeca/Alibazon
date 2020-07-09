var express = require('express');
const breadcrumb=require('../utils/breadcrumbs_functions');
const page='category-menu-option';
const cat =["cat1","cat2","cat3"];
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
  const breadcrumbs=breadcrumb.breadcrumbsHome("cat1");
  res.render('index',{page:page,categories: cat, pressed:"cat1", breadcrumbs:breadcrumbs,
                       description:'description', subcategories:subcat});
};

exports.subcategory= function(req, res) {
  const breadcrumbs=breadcrumb.breadcrumbsHome(req.params.category);
  res.render('index',{page:page,categories: cat, pressed:req.params.category, breadcrumbs:breadcrumbs,
                      description:'description', subcategories:subcat});
};

