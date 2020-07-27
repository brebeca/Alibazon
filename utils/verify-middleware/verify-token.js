const utils=require('../utils-functions');
const config=require('../../config')

exports.tokenVerify = function(req, res, next){
        if(req.cookies.token===undefined){
            res.locals.logged=false;
        }
        else{
            res.locals.logged=true;
        }
        next();
}

exports.shouldHaveTokenVerify = async function(req, res, next){
    if(req.cookies.token!==undefined){
        res.locals.logged=true;
        next();
    }
    else{
        await handleRander(401, ' UNAUTHORIZED : 401 !','page not found', res)
    }
}

exports.shouldNotHaveTokenVerify = async function(req, res, next){
    if(req.cookies.token===undefined){
        res.locals.logged=false;
        next();
    }
    else{
        await handleRander(403, ' 403  Forbidden ','page not found', res)
    }
}

async function handleRander(code, message, breadCrumbsName, res) {
    try{
        let pageVars=await utils.getThePageVars(message,breadCrumbsName);
        res.status(code);
        res.render(config.indexPage,pageVars);
    }catch (e) {
        res.status(500);
        res.render(config.errorPage);
    }
}