const breadcrumb=require('../../utils/breadcrumbs_functions');
const config =require('../../config');
const categoryAPI=require('../../APIdata/get-categories');
const loginAPI=require('../../APIdata/authAPI/login');
const mail=require('../../utils/mail/send-mail');

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
        res.render('/error-pages/error2');
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

exports.loginMail= async function(req,res) {
   try {
       let user={};
       loginAPI.login(req.body.email, req.body.password)
           .then((userresponse)=>{
               user=userresponse;
           })
           .catch((err)=>{
               //console.log(err.error);
               res.status(400);
               res.json({message: err.error});
           });
       let code = Math.random().toString(36).substr(2, 9);
       let ok = await mail.send(req.body.email, req.body.username, code);
       if ( !ok ) throw `The mailing server did not respond properly !`;
       res.status(200);
       res.json(user);
   } catch (err) {
       console.log(err);
       res.status(400);
       res.json({message: err});
   }

}