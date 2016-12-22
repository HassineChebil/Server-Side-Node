/**
 * Created by chiheb on 25/03/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var mime = require('mime');

var storage = multer.diskStorage({
    destination: './public/demand/img/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.'+mime.extension(file.mimetype));
    }
});

var upload = multer({storage : storage,
}).single('file');

/* GET liste des demandes. */
router.get('/', function(req, res, next) {
    models.demand.find({}).exec(function (err, demands) {
        if(err) res.json({error : err});
        res.json(demands);
    });
});

/* GET liste des demandes par user. */
router.get('/user/:id', function(req, res, next) {
    models.demand.find({user : req.params.id}).exec(function (err, demands) {
        if(err) res.json({error : err});
        res.json(demands);
    });
});

/*POST ajouter demande*/
router.post('/', function (req, res) {
    var c = new models.demand({content : req.body.content, type : req.body.type,price : req.body.price,fees : req.body.fees,
        status : "On hold",date : req.body.date,user :req.body.user});
    c.save(function (err,cat) {
        if(err) res.json({error : err});
        res.json(cat);
    });
});

/*GET Récupérer une demande*/
router.get('/:id', function (req, res) {
    models.demand.findById(req.params.id, function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});

/*PUT Modifier une demande*/
router.put('/:id', function (req, res) {
    models.demand.findByIdAndUpdate(req.params.id,{content : req.body.content, type : req.body.type,price : req.body.price,
            fees : req.body.fees,date : req.body.date},
        {new : true}, function (err , cat) {
            if(err) res.json({error : err});
            res.json(cat);
        })
});

/*DELETE Supprimer une demande*/
router.delete('/:id', function (req, res) {
    models.demand.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : err});
        return res.json({done : 1});
    })
});

/*PUT Accepter une demande*/
router.put('/accept/:id', function (req, res) {
    models.demand.findByIdAndUpdate(req.params.id,{status : "Accepted"},
        {new : true}, function (err , cat) {
            if(err) res.json({error : err});
            res.json(cat);
        })
});

/*PUT Refuser une demande*/
router.put('/deny/:id', function (req, res) {
    models.demand.findByIdAndUpdate(req.params.id,{status : "Refused"},
        {new : true}, function (err , cat) {
            if(err) res.json({error : err});
            res.json(cat);
        })
});

/*PUT Ajouter un rendez-vous à une demande*/
router.put('/add/:id', function (req, res) {
    models.demand.findByIdAndUpdate(req.params.id,{"appointment.date" : req.body.date, "appointment.address" : req.body.address,
        "appointment.latitude" : req.body.latitude, "appointment.longitude" : req.body.longitude},
        {new : true}, function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});

/*PUT Supprimer un rendez-vous à une demande*/
router.put('/delete/:id', function (req, res) {
    models.demand.findByIdAndUpdate(req.params.id,{appointment :{}},
        {new : true}, function (err , cat) {
            if(err) res.json({error : err});
            res.json(cat);
        })
});

/*POST Ajouter une image à une demande*/
router.post('/updateImg/:id', upload,function (req, res) {
    upload(req,res,function(err){

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        models.demand.findByIdAndUpdate(req.params.id,{image : req.file.filename},{new : true}, function (err , user) {
            if(err) res.json({err:err});
        });
        res.json({error_code:0,err_desc:null});
    })
});

module.exports = router;