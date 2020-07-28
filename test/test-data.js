module.exports={
    userLogin:{
        email:'test1@yahoo.com',
        password:'123456',
        notanemail:'notanemail@yahoo.com',
        notapassword:'notapass'
    },
    userSignup:{
        email:'test2@yahoo.com',
        password:'123456',
        name:'test2'
    },
    searchKeyWord:'pants',
    notAParentID:'not-a-parent-id',
    parent:'mens-clothing-dress-shirts',
    sendEmail:require('../utils/mail/send-mail').send,
    searchNonExistingKeyWord:'sdsegre',
    breadCrumbsFunctions:require('../utils/breadcrumbs_functions'),
    signUpAIP:require('../APIdata/authAPI/signup'),
    databse:require('../utils/database-utils/db-functions'),
    productsAPIfunctions : require('../APIdata/products'),
    subcategoryAPIfunctions:require('../APIdata/subcategories'),
    categoryAPIfunctions:require('../APIdata/get-categories'),
    orderAPIfunctions:require('../APIdata/orderAPI'),
    UserModel:require('../utils/models/userModel').UserModel,
    product:{
        "master": {
            "orderable": true,
            "price": 130,
            "master_id": "69309284"
        },
        "type": {
            "master": true
        },
        "_id": "5172d203ffdd81f3234d5f8f",
        "price_max": 135,
        "page_description": "This modern dress shirt adds a touch of character to an office staple. Made in our multi-fine stripe fabric.",
        "page_title": "Modern Striped Dress Shirt",
        "name": "Modern Striped Dress Shirt",
        "price": 130,
        "variation_attributes": [
            {
                "values": [
                    {
                        "orderable": true,
                        "name": "Blue",
                        "value": "blue"
                    }
                ],
                "id": "color",
                "name": "color"
            },
            {
                "values": [
                    {
                        "orderable": true,
                        "name": "15R",
                        "value": "15R"
                    },
                    {
                        "orderable": true,
                        "name": "15L",
                        "value": "15L"
                    },
                    {
                        "orderable": true,
                        "name": "16R",
                        "value": "16R"
                    },
                    {
                        "orderable": true,
                        "name": "16L",
                        "value": "16L"
                    }
                ],
                "id": "size",
                "name": "size"
            }
        ],
        "id": "69309284",
        "currency": "USD",
        "primary_category_id": "mens-clothing-dress-shirts",
        "image_groups": [
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, , large",
                        "link": "products.js/large/B0174514_GY9_0.jpg",
                        "title": "Modern Striped Dress Shirt, "
                    }
                ],
                "view_type": "large"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, Blue, large",
                        "link": "products.js/large/B0174514_GY9_0.jpg",
                        "title": "Modern Striped Dress Shirt, Blue"
                    }
                ],
                "variation_value": "blue",
                "view_type": "large"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, , medium",
                        "link": "products.js/medium/B0174514_GY9_0.jpg",
                        "title": "Modern Striped Dress Shirt, "
                    }
                ],
                "view_type": "medium"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, Blue, medium",
                        "link": "products.js/medium/B0174514_GY9_0.jpg",
                        "title": "Modern Striped Dress Shirt, Blue"
                    }
                ],
                "variation_value": "blue",
                "view_type": "medium"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, , small",
                        "link": "products.js/small/B0174514_GY9_0.jpg",
                        "title": "Modern Striped Dress Shirt, "
                    }
                ],
                "view_type": "small"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, Blue, small",
                        "link": "products.js/small/B0174514_GY9_0.jpg",
                        "title": "Modern Striped Dress Shirt, Blue"
                    }
                ],
                "variation_value": "blue",
                "view_type": "small"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, , swatch",
                        "link": "products.js/swatch/B0174514_GY9_sw.jpg",
                        "title": "Modern Striped Dress Shirt, "
                    }
                ],
                "view_type": "swatch"
            },
            {
                "images": [
                    {
                        "alt": "Modern Striped Dress Shirt, Blue, swatch",
                        "link": "products.js/swatch/B0174514_GY9_sw.jpg",
                        "title": "Modern Striped Dress Shirt, Blue"
                    }
                ],
                "variation_value": "blue",
                "view_type": "swatch"
            }
        ],
        "short_description": "This modern dress shirt adds a touch of character to an office staple. Made in our mini-box check fabric.",
        "orderable": true,
        "variants": [
            {
                "variation_values": {
                    "color": "blue",
                    "size": "15R"
                },
                "price": 130,
                "product_id": "69309284-1",
                "orderable": true
            },
            {
                "variation_values": {
                    "color": "blue",
                    "size": "15L"
                },
                "price": 135,
                "product_id": "69309284-2",
                "orderable": true
            },
            {
                "variation_values": {
                    "color": "blue",
                    "size": "16R"
                },
                "price": 135,
                "product_id": "69309284-3",
                "orderable": true
            },
            {
                "variation_values": {
                    "color": "blue",
                    "size": "16L"
                },
                "price": 135,
                "product_id": "69309284-4",
                "orderable": true
            }
        ],
        "long_description": "<ul>\n    <li>97.6% cotton, 2.4% lycra</li>\n    <li>point collar</li>\n    <li>modern shape</li>              <li>left chest pocket</li>\n    <li>dry clean only</li>         </ul>"

    },
    parentID:'mens-accessories',
    subcategory :'mens-clothing-dress-shirts',
    productID:'69309284',
    variantID:'69309284-4',
    loginAPI: require('../APIdata/authAPI/login'),
    notACategory:'not-a-category',
    notAsubcategory:'not-a-subcategory',
    id:'74974310',
    notAid:'not-a-id',
    category:'mens-accessories',
    size:'large',
    notIterable:true,
    iterable:[1,2,3],
    utils:require('../utils/utils-functions'),
    res:{locals:{pressed:'', product:{}}},
    cartAPI: require('../APIdata/cartAPI'),
}