/**
 * Body verify module.
 * @module Verify-middleware/verify-body
 */

/**
 *  Checks if the login information exists in the body of the request
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 */
exports.loginBodyVerify = (req, res, next)=> {
    try {
        if(req.body.email===undefined)
            throw ' Missing email ';

        if(req.body.password===undefined)
            throw ' Missing password ';
        next();
    }catch (e) {
      //console.log(e);
        res.status(500);
        res.json({ message: e});
    }

}

/**
 *  Checks if for the signup information exists in the body of the request
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 */
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

/**
 *  Checks if for the code validation information exists in the body of the request
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 */
exports.codeBodyVerify = (req, res, next)=> {
    try {
        if(req.body.email===undefined)
            throw ' Missing email ';

        if(req.body.code===undefined)
            throw ' Missing code ';
        next();
    }catch (e) {
        //console.log(e);
        res.status(400);
        res.json({ message: e});
    }
}

/**
 *  Checks if the  add to cart information exists in the body of the request
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 */
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