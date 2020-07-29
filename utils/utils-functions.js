const roots= require('../utils/categories-utils');
const categoryAPI=require('../APIdata/get-categories');
const config=require('../config');


exports.getTheMainCategories= (categories)=>{
    categories= categories.filter(function (item) {
        if (item.parent_category_id === roots.root1|| item.parent_category_id === roots.root2) {
            item.name = item.parent_category_id.charAt(0).toUpperCase() + item.parent_category_id.slice(1) + ' ' + item.name;
            return item;
        }
    });
    return categories;
}

exports.getImgPath=(item , index, size)=>{
    return item.image_groups.filter(function (item2) {
        return item2.view_type===size;
    })[0].images[0].link;
}

exports.getImgPathByVariant=(item , index, value)=>{
    return item.image_groups.filter(function (item2) {
        return item2.variation_value===value;
    })[0].images[0].link;
}

exports.isIterable=(obj) =>{
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

exports.getThePageVars= async ( message, breadcrumbs)=>{
    let categories=[];
    try{
         categories=await categoryAPI.getAllCategories();
    }catch (e) {
        categories=[]
    }
   return  {
        page:config.notFoundPage,
        message:message,
        categories: categories,
        pressed: 'none',
        breadcrumbs:{
            path: [
                {
                    title: 'home',
                    link: '/'
                }
            ]
            ,
            active:breadcrumbs
        }
    }
}

exports.getARandomCode= ()=>{return Math.random().toString(36).substr(2, 9);}

