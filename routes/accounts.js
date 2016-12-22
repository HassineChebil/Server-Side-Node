var express = require('express');
var models = require('../models');
var passport = require('passport');
var router = express.Router();
var Account = models.account;

router.post('/', function(req, res) {
    var data = req.body;
    Account.register(new Account(data), req.body.password, function(err,user) {
        if (err) {
            res.json({ err : err
            });
        }
        else{
            var c = new models.bank({owner : user._id});
            c.save(function (err,bank) {
                if(err) res.json({error : err});
            });
            res.json({success : true});
        }
    });

});


module.exports = router;