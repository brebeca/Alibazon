
const config =require('../config');
const cartAPI= require('../APIdata/cart')

exports.add = async function(req, res) {
    cartAPI.add(req.body.productID, req.body.variantID,1,req.cookies.token)
        .then((response)=>{
           // console.log(response);
            res.status(200);
            res.json(response);
        })
        .catch((err)=>{
           // console.log(err.error);
            res.status(400);
            res.json({message: err.error});
        });

};
