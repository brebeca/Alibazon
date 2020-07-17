const breadcrumb=require('../../utils/breadcrumbs_functions');
const config =require('../../config');
const categoryAPI=require('../../APIdata/get-categories');
const loginAPI=require('../../APIdata/authAPI/login');

exports.loginPage = async function(req, res) {
    try{
        res.render(config.indexPage,{
            page:config.LoginPage,
            categories: await categoryAPI.getAllCategories(),
            pressed: 'none',
            breadcrumbs:breadcrumb.breadcrumbsLogin()
        });
    }catch (e) {
        res.status(e.status || 500);
        res.render('/error-pages/error2');
    }
};

exports.loginValidation = async function(req, res) {
        loginAPI.login(req.body.email, req.body.password)
            .then((user)=>{
                res.status(200);
                res.cookie('token', user.token, { maxAge: 900000, httpOnly: true });
                res.json(user);
            })
            .catch((err)=>{
                //console.log(err.error);
                res.status(400);
                res.json({message: err.error});
            });
};