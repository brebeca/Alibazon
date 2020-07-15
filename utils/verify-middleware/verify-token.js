
exports.tokenVerify = function(req, res, next){
        if(req.cookies.token===undefined){
            res.locals.logged=false;
        }
        else{
            res.locals.logged=true;
        }
        next();
}