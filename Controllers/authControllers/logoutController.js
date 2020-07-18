

exports.logOut = async function(req, res) {
    try {
        res.status(200);
        res.cookie('token', req.cookies.token, { maxAge: 0});
        ///  cookies.set('testtoken', {expires: Date.now()});
        res.json({message:'cookes unset'});
    }catch (e) {
        console.log(e);
        res.status(500);
        res.json({error:e});
    }
};