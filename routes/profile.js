var models = require('../models');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var multer = require('multer');
var mime = require('mime');
var Account = models.account;

var storage = multer.diskStorage({
    destination: './public/profile/img/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.'+mime.extension(file.mimetype));
    }
});

var upload = multer({storage : storage,
}).single('file');

/* GET users. */
router.get('/', function(req, res, next) {
        models.account.find({}).populate('evaluationAsSeeker.evaluators.owner evaluationAsTraveler.evaluators.owner evaluationAsTraveler.avis.owner evaluationAsSeeker.avis.owner').exec(function (err, users) {
            if(err) res.json({error : err});
            res.json(users);
        });
});

/*GET 5 First Travelers Ordered By Evaluation*/
router.get('/travelers', function(req, res, next) {
    models.account.find({}).populate('evaluationAsTraveler.evaluators.owner').sort({'evaluationAsTraveler.total': -1}).limit(4).exec(function (err, users) {
        if(err) res.json({error : err});
        res.json(users);
    });
});

/*GET 5 First Seekers Ordered By Evaluation*/
router.get('/seekers', function(req, res, next) {
    models.account.find({}).populate('evaluationAsSeeker.evaluators.owner').sort({'evaluationAsSeeker.total': -1}).limit(4).exec(function (err, users) {
        if(err) res.json({error : err});
        res.json(users);
    });
});

/*GET user info*/
router.get('/:id', function (req, res) {
    models.account.findById(req.params.id, function (err , user) {
        if(err) res.json({success : false ,error : err});
        res.json(user);
    })
});

/*PUT Update profile*/
router.put('/:id', function (req, res) {
    var data = req.body;
    models.account.findByIdAndUpdate(req.params.id,data,{new : true}, function (err , user) {
        if(err) res.json({error : err});
        res.json(user);
    })
});

/*DELETE profile*/
router.delete('/:id', function (req, res) {
    models.account.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : err});
        models.bank.find({owner : req.params.id}, function (err,bank) {
            if (err) res.json({error : err});
            models.bank.remove(bank, function (err) {
                if (err) res.json({error : err});
            })
        });
        return res.json({done : 1});
    })
});

router.post('/updateImg/:id', upload,function (req, res) {


    upload(req,res,function(err){

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        models.account.findByIdAndUpdate(req.params.id,{image : req.file.filename},{new : true}, function (err , user) {
            if(err) res.json({err:err});

        });

        res.json({error_code:0,err_desc:null});

    })
});

router.put('/updatePass/:id',function(req, res){
    console.log(req.params.id);
    Account.find({_id : req.params.id},function(err,account){
        console.log(account);
        if(err){res.json({succes:false, message : 'Utilisateur non trouvé'})}

        account[0].setPassword(req.body.pass,function(err,user){
            user.password = req.body.pass;
            user.save();
        });
        res.json({success : true, message : "Mot de passe mis à jour"})
    });
});


module.exports = router;
