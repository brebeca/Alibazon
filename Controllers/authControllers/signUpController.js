const breadcrumb=require('../../utils/breadcrumbs_functions');
const config =require('../../config');
const categoryAPI=require('../../APIdata/get-categories');
const singUpAPI=require('../../APIdata/authAPI/signup');
const mail = require("../../utils/mail/send-mail");
const database=require('../../utils/database-utils/db-functions');

const utils=require('../../utils/utils-functions');
exports.signUpPage = async function(req, res) {
    try{
        res.render(config.indexPage,{
            page:config.signUpPage,
            categories: await categoryAPI.getAllCategories(),
            pressed: 'none',
            breadcrumbs:breadcrumb.getBreadcrumbs('signup')
        });
    }catch (e) {
        res.status(e.status || 500);
        res.render(config.indexPage,await utils.getThePageVars(' Internal error!','page fail'));
    }
};

exports.codeVerifyPage = async function(req, res) {
    try{
        let categories=await categoryAPI.getAllCategories()
        res.render(config.indexPage,{
            page:config.codeVerifyPage,
            categories: categories,
            pressed: 'none',
            breadcrumbs:breadcrumb.getBreadcrumbs('confirm code')
        });
    }catch (e) {
        res.status(e.status || 500);
        res.render(config.indexPage,await utils.getThePageVars(' Internal error!','page fail'));
    }
};

exports.signUpSendMail= async function(req, res){
    try {
        let user=false;
        let code = Math.random().toString(36).substr(2, 9);
        let account={
            code: code,
            email: req.body.email,
            password: req.body.password,
            name:req.body.name,
            confirmed: false
        }
        user=await singUpAPI.signUp(account.email, account.password, account.name);
        let ok=true;
        if(user!==false){
            await database.insertAccount(account);

             ok = await mail.send(req.body.email, req.body.name, code);

        }
        if ( !ok ) throw `The mailing server did not respond properly !`;
        res.status(200);
        res.json({message:'SignUp succeeded! '});
    } catch (err) {
        res.status(400);
        res.json({message: err.error});
    }
}

exports.verifyCode= async function(req, res ){
    try {
        //add body validation
       let account= await database.verifyAccount(req.body.code, req.body.email);
       if(account===false)
           throw "The code and email do not match";
       await database.confirmeEmail(req.body.email);
        res.status(200);
        res.json({message:' Confirmation succeeded! '});
    }catch (e) {
        console.log(e);
        res.status(400);
        res.json({message: e});
    }
}

