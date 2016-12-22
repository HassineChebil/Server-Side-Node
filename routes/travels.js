
var models = require('../models');
var express = require('express');
var Travel = require('../models/travel.js');
var router = express.Router();


router.get('/', function(req, res, next) {
    models.travel.find({}).populate('user').exec(function (err, travels) {
        if(err) res.json({error : err});
        res.json(travels);
    });
});

router.get('/byUser/:id', function(req, res, next) {
    models.travel.find({user : req.params.id}).populate('user demand user.evaluationAsSeeker.avis.owner user.evaluationAsTraveler.avis.owner').exec(function (err, travels) {
        if(err) res.json({error : err});
        res.json(travels);
    });
});


router.post('/', function (req, res) {
    var c = new models.travel({ titre : req.body.titre, description : req.body.description,
        destination : req.body.destination,  date_dep : req.body.date_dep, date_arr : req.body.date_arr,
        type_trens : req.body.type_trens, quan_trens : req.body.quan_trens, image : req.body.image,user :req.body.user,
        tags:req.body.tags,commantaire:req.body.commantaire });
    c.save(function (err,cat) {
        if(err) res.json({error : err});
        res.json(cat);
    });
});


router.get('/:id', function (req, res) {
    models.travel.findById(req.params.id).populate('user').exec(function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});



router.put('/:id', function (req, res) {
    models.travel.findByIdAndUpdate(req.params.id,{$push :{demand : req.body.demand}},
        {new : true,safe: true, upsert: true}, function (err , cat) {
            if(err) res.json({error : err});
            res.json(cat);
        })
});


router.delete('/:id', function (req, res) {
    models.travel.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : err});
        return res.json({done : 1});
    })
});


router.post('/find/', function(req, res){



    var titre = req.body.titre;
    var destination = req.body.destination;
    var date_dep= req.body.date_dep;
    var date_arr= req.body.date_arr;
    var type_trens= req.body.type_trens;
    var quan_trens= req.body.quan_trens;





    var query = Travel.find({});




    if(titre){
        query = query.where('titre').equals(titre);
    }

    if(destination){
        query = query.where('destination').equals(destination);
    }

    if(date_dep){
        query = query.where('date_dep').equals(date_dep);
    }

    if(date_arr){
        query = query.where('date_arr').equals(date_arr);
    }

    if(type_trens){
        query = query.where('type_trens').equals(type_trens);
    }

    if(quan_trens){
        query = query.where('quan_trens').equals(quan_trens);
    }


    query.exec(function(err, cat){
        if(err)
            res.send(err);
        else
            res.json(cat);
    });
});


module.exports = router;