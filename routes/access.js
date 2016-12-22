var express = require('express');
var models = require('../models');
var passport = require('passport');
var router = express.Router();
var Account = models.account;


router.post('/', passport.authenticate('local', {failureRedirect: '/access/error',failureFlash: true}), function (req,res) {
    res.json({success : true,user :req.user});
});

router.get('/error', function (req,res) {
    var error = req.flash();
    res.json({error :error.error[0]});
});

router.get('/', function(req, res) {

    req.logout();
    res.json({success: true, message : 'Utilisateur déconnecté'})
});


module.exports = router;
