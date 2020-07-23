const utils=require('../utils-functions');

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
        res.status(401);
        res.render(config.indexPage,await utils.getThePageVars(' UNAUTHORIZED : 401 !','page not found'));
    }
}

exports.shouldNotHaveTokenVerify = async function(req, res, next){
    if(req.cookies.token===undefined){
        res.locals.logged=false;
        next();
    }
    else{
        res.status(403);
        res.render(config.indexPage,await utils.getThePageVars(' 403  Forbidden ','page not found'));
    }
}