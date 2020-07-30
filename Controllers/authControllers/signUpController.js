
/**
 * SignUp Controller module.
 * @module Controllers/authControllers/signUpController
 * @see module:APIdata/get-categories
 * @see module:APIdata/authAPI/signup
 */


const breadcrumb=require('../../utils/breadcrumbs_functions'),
    config =require('../../config'),
    categoryAPI=require('../../APIdata/get-categories'),
    singUpAPI=require('../../APIdata/authAPI/signup'),
    mail = require("../../utils/mail/send-mail"),
    database=require('../../utils/database-utils/db-functions'),
    {AccountModel}=require('../../utils/models/accountModel'),
    utils=require('../../utils/utils-functions');

/**
 * Renders the signUp page
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
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


/**
 * Renders the codeverifing page
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
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

/**
 * Registers the user to the database and sends the confirmation email
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.signUpSendMail= async function(req, res){
    try {
        let ok=true;
        let user=true;
        let code = utils.getARandomCode();
        let account= new AccountModel(req.body.name,req.body.email, code ,req.body.password,);

        user=await singUpAPI.signUp(account.email, account.password, account.name);
        if(user!==false){
             database.insertAccount(account).then((response)=>console.log(response)).catch(err=>console.log(err));
             ok = await mail.send(req.body.email, req.body.name,code );
        }
        if ( !ok ) throw `The mailing server did not respond properly !`;

        res.status(200);
        res.json({message:'SignUp succeeded! '});

    } catch (err) {
        res.status(400);
        res.json({message: err.error});
    }
}

/**
 * Verifies if the code sent corresponds with the one in the database
 *  @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<void>}
 */
exports.verifyCode= async function(req, res ){
    try {
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

