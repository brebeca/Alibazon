const breadcrumb=require('../../utils/breadcrumbs_functions'),
    config =require('../../config'),
    categoryAPI=require('../../APIdata/get-categories'),
    loginAPI=require('../../APIdata/authAPI/login'),
    utils=require('../../utils/utils-functions');

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

exports.loginValidation = async function(req, res) {
  loginAPI.login(req.body.email, req.body.password)
            .then((user)=>{
                res.status(200);
                res.cookie('token', user.token, { maxAge: 9000000, httpOnly: true });
                res.json(user);
            })
            .catch((err)=>{
                //console.log(err.error);
                res.status(400);
                res.json({message: err.error});
            });
};

