/**
 * Request token verify module.
 * @module Verify-middleware/verify-token
 */
const utils=require('../utils-functions');
const config=require('../../config')

/**
 * Sets the res.locals.logged variable
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 */
exports.tokenVerify = function(req, res, next){
        if(req.cookies.token===undefined){
            res.locals.logged=false;
        }
        else{
            res.locals.logged=true;
        }
        next();
}

/**
 * Checks if the request has the token cookie
 * @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 * @returns {Promise<void>}
 */
exports.shouldHaveTokenVerify = async function(req, res, next){
    if(req.cookies.token!==undefined){
        res.locals.logged=true;
        next();
    }
    else{
        await handleRander(401, ' UNAUTHORIZED : 401 !','page not found', res)
    }
}

/**
 * Checks if the request has the token cookie
 * @async
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @param {function}next
 * @returns {Promise<void>}
 */
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