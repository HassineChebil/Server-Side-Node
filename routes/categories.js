/**
 * Created by hassine on 3/17/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET liste des catégories. */
router.get('/', function(req, res, next) {
    models.category.find({}).exec(function (err, categories) {
        if(err) res.json({error : err});
        res.json(categories);
    });
});

/*POST ajouter catégorie*/
router.post('/', function (req, res) {
    var c = new models.category({name : req.body.name});
    c.save(function (err,cat) {
        if(err) res.json({error : err});
        res.json(cat);
    });
});

/*GET Récupérer une catégorie*/
router.get('/:id', function (req, res) {
   models.category.findById(req.params.id, function (err , cat) {
       if(err) res.json({error : err});
       res.json(cat);
   })
});

/*PUT Modifier une catégorie*/
router.put('/:id', function (req, res) {
    models.category.findByIdAndUpdate(req.params.id,{name : req.body.name},{new : true}, function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});

/*DELETE Supprimer une catégorie*/
router.delete('/:id', function (req, res) {
    models.category.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : err});
        return res.json({done : 1});
    })
});


module.exports = router;
