const roots= require('../utils/categories-utils');
const {userModel} = require('./models/userModel');

/**
 * filters the main category objects
 * updates the field name adding the parent category capitalized
 * @param categories array of category objects
 * @returns {*} array with the main categories
 */
exports.getTheMainCategories= (categories)=>{
    categories= categories.filter(function (item) {
        if (item.parent_category_id === roots.root1|| item.parent_category_id === roots.root2) {
            item.name = item.parent_category_id.charAt(0).toUpperCase() + item.parent_category_id.slice(1) + ' ' + item.name;
            return item;
        }
    });
    return categories;
}


/**
 * searchs the array image_groups in te object to get the element with the field view_type= size  function parameter
 * returns the field link of the object
 * @param item       the object in witch to search
 * @param index
 * @param size       the size of the image path to be returned
 * @returns {((existingPath: PathLike, newPath: PathLike, callback: NoParamCallback) => void) | ((existingPath: PathLike, newPath: PathLike) => Promise<void>) | string | string | link | ((url: string) => string)}
 */
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

