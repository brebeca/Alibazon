require('dotenv').config();

const env = process.env.NODE_ENV;


const test = {
    db: {
        databaseName:process.env.TEST_DB_NAME ,
        connectoinString:process.env.CONNECTION_STRING
    },
    root: {
        root1: "mens",
        root2: "womens"
    },
    app:{
        port: parseInt(process.env.PORT) || 3000
    },
    dns:process.env.SENTRY_DNS,
    baseURL:process.env.BASE_URL,
    secretKEY:process.env.SECRET_KEY,
    homePage:'category-menu-option',
    productsPage:'subcategory-page',
    productDetailsPage:'product-page',
    cartPage:'cart-page',
    searchPage:'search-page',
    errorPage:'error-pages/error2',
    notFoundPage:'error-pages/page-not-found',
    LoginPage:'auth/login',
    signUpPage:'auth/signUp',
    codeVerifyPage:'auth/confirm-page',
    defaultCategory:'womens-jewelry',
    indexPage:'index',
    wishListPage:'cart-page'
};

const dev= {
    db: {
        databaseName:process.env.DEV_DB_NAME ,
        connectoinString:process.env.CONNECTION_STRING
    },
    root: {
        root1: "mens",
        root2: "womens"
    },
    app:{
        port: parseInt(process.env.PORT) || 3000
    },
    dns:process.env.SENTRY_DNS,
    baseURL:process.env.BASE_URL,
    secretKEY:process.env.SECRET_KEY,
    homePage:'category-menu-option',
    productsPage:'subcategory-page',
    productDetailsPage:'product-page',
    cartPage:'cart-page',
    searchPage:'search-page',
    errorPage:'error-pages/error2',
    notFoundPage:'error-pages/page-not-found',
    LoginPage:'auth/login',
    signUpPage:'auth/signUp',
    codeVerifyPage:'auth/confirm-page',
    defaultCategory:'womens-jewelry',
    indexPage:'index',
    wishListPage:'cart-page'
};

const config = {
    dev,
    test
}
module.exports=config[env];