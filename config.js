module.exports = {
    root: {
        root1: "mens",
        root2: "womens"
    },
    baseURL:process.env.BASE_URL,
    secretKEY:process.env.SECRET_KEY,
    homePage:'category-menu-option',
    productsPage:'subcategory-page',
    productDetailsPage:'product-page',
    cartPage:'cart-page',
    notFoundPage:'errpr-page/page-not-found',
    LoginPage:'auth/login',
    signUpPage:'auth/signUp',
    defaultCategory:'womens-jewelry',
    indexPage:'index',
    wishListPage:'cart-page'
}