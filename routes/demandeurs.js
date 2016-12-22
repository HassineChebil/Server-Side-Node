var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET liste des demandeurs. */
router.get('/', function(req, res, next) {
    models.demandeur.find({}).exec(function (err, demandeurs) {
        if(err) res.json({error : err});
        res.json(demandeurs);
    });
});

/*POST ajouter demandeur*/
router.post('/', function (req, res) {
    var d = new models.demandeur({name : req.body.name});
    d.save(function (err,cat) {
        if(err) res.json({error : err});
        res.json(cat);
    });
});

/*GET Récupérer un demandeur*/
router.get('/:id', function (req, res) {
    models.demandeur.findById(req.params.id, function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});

/*PUT Modifier un demandeur*/
router.put('/:id', function (req, res) {
    models.demandeur.findByIdAndUpdate(req.params.id,{name : req.body.name},{new : true}, function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});

/*DELETE Supprimer un demandeur*/
router.delete('/:id', function (req, res) {
    models.demandeur.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : err});
        return res.json({done : 1});
    })
});


module.exports = router;
