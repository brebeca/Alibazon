const breadcrumb=require('../../utils/breadcrumbs_functions');
const config =require('../../config');
const categoryAPI=require('../../APIdata/get-categories');
const singUpAPI=require('../../APIdata/authAPI/signup');

exports.signUpPage = async function(req, res) {
    try{
        res.render(config.indexPage,{
            page:config.signUpPage,
            categories: await categoryAPI.getAllCategories(),
            pressed: 'none',
            breadcrumbs:breadcrumb.breadcrumbsSignUp()
        });
    }catch (e) {
        res.status(e.status || 500);
        res.render('/error-pages/error2');
    }
};

exports.signUpValidation = async function(req, res) {
    singUpAPI.signUp(req.body.email, req.body.password, req.body.name)
        .then((user)=>{
            res.status(200);
            res.json(user);
        })
        .catch((err)=>{
            //console.log(err.error);
            res.status(400);
            res.json({message: err.error});
        });
};