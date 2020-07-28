/**
 * Performs logout setting the cooke to expire
 * @param {Object}req the request object
 * @param {Object}res the response object
 * @returns {Promise<JSON>}
 */
exports.logOut = async function(req, res) {
    try {
        res.status(200);
        res.cookie('token', req.cookies.token, { maxAge: 0});
        res.json({message:'cookes unset'});
    }catch (e) {
        console.log(e);
        res.status(500);
        res.json({error:e});
    }
};