module.exports = {
    root: {
        root1: "mens",
        root2: "womens"
    },
    app:{
        port:8000
    },
    db:{
        databaseName:'Alibazon',
        connectoinString:process.env.CONNECTION_STRING
    },
    baseURL:process.env.BASE_URL,
    secretKEY:process.env.SECRET_KEY,
    homePage:'category-menu-option',
    productsPage:'subcategory-page',
    productDetailsPage:'product-page',
    cartPage:'cart-page',
    searchPage:'search-page',
    notFoundPage:'error-pages/page-not-found',
    LoginPage:'auth/login',
    signUpPage:'auth/signUp',
    codeVerifyPage:'auth/confirm-page',
    defaultCategory:'womens-jewelry',
    indexPage:'index',
    wishListPage:'cart-page'
}