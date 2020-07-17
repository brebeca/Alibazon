
exports.loginBodyVerify = (req, res, next)=> {
    try {
        if(req.body.email===undefined)
            throw ' Missing email ';

        if(req.body.password===undefined)
            throw ' Missing password ';
        next();
    }catch (e) {
      //console.log(e);
        res.status(400);
        res.json({ message: e});
    }

}

exports.signUpBodyVerify = (req, res, next)=> {
    try {
        if(req.body.email===undefined)
            throw ' Missing email ';

        if(req.body.password===undefined)
            throw ' Missing password ';

        if(req.body.name===undefined)
            throw ' Missing name ';
        next();
    }catch (e) {
        //console.log(e);
        res.status(400);
        res.json({ message: e});
    }
}

exports.addToCartBodyVerify = (req, res, next)=> {
    try {
        if(req.body.productID===undefined)
            throw ' Missing productID ';

        if(req.body.variantID===undefined)
            throw ' Missing variantID ';

        next();
    }catch (e) {
        //console.log(e);
        res.status(400);
        res.json({ message: e});
    }
}