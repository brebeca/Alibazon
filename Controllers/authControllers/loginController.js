const breadcrumb=require('../../utils/breadcrumbs_functions'),
    config =require('../../config'),
    categoryAPI=require('../../APIdata/get-categories'),
    loginAPI=require('../../APIdata/authAPI/login'),
    utils=require('../../utils/utils-functions');

/**
 * Renders the login page
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>} a promise of the login page
 */
exports.loginPage = async function(req, res) {
    try{
        res.render(config.indexPage,{
            page:config.LoginPage,
            categories: await categoryAPI.getAllCategories(),
            pressed: 'none',
            breadcrumbs:breadcrumb.getBreadcrumbs('login')
        });
    }catch (e) {
        res.status(e.status || 500);
        res.render(config.indexPage,await utils.getThePageVars(' Internal error!','page fail'));
    }
};

/**
 * Performs login setting a cookie
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<JSON>} An json object with an success or failure message
 */
exports.loginValidation = async function(req, res) {
  loginAPI.login(req.body.email, req.body.password)
            .then((user)=>{
                res.status(200);
                res.cookie('token', user.token, { maxAge: 9000000, httpOnly: true });
                res.json(user);
            })
            .catch((err)=>{
                res.status(400);
                res.json({message: err.error});
            });
};

