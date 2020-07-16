
exports.tokenVerify = function(req, res, next){
        if(req.cookies.token===undefined){
            res.locals.logged=false;
        }
        else{
            res.locals.logged=true;
        }
        next();
}

exports.shouldHaveTokenVerify = function(req, res, next){
    if(req.cookies.token!==undefined){
        res.locals.logged=true;
        next();
    }
    else{
        res.status(401);
        res.send(' 401  Unauthorized ');
    }
}

exports.shouldNotHaveTokenVerify = function(req, res, next){
    if(req.cookies.token===undefined){
        res.locals.logged=false;
        next();
    }
    else{
        res.status(403);
        res.send(' 403  Forbidden ');
    }
}