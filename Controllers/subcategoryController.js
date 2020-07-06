var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:subcategory', function(req, res, next) {
    try{
        if(req.params.subcategory===undefined) throw `No subcategory`;
        res.render('index', { title: 'PAge for subcategory: '+req.params.subcategory });
    }
    catch (e) {
        res.render('')
    }

});

module.exports = router;