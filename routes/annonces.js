
var models = require('../models');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var mime = require('mime');

var storage = multer.diskStorage({
    destination: './public/annonce/img/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.'+mime.extension(file.mimetype));
    }
});

var upload = multer({storage : storage,
}).single('file');



/* GET liste des annonces. */
router.get('/', function(req, res, next) {
    models.annonce.find({}).populate('user').exec(function (err, annonces) {
        if(err) res.json({error : err});
        res.json(annonces);
    });
});

/*POST ajouter annonce*/
router.post('/', function (req, res) {
    var a = new models.annonce({titre : req.body.titre,ville_depart : req.body.ville_depart, ville_arrivee : req.body.ville_arrivee,
        date : req.body.date,image : req.body.image ,argent : req.body.argent,categorie : req.body.categorie,status : req.body.status,
        description : req.body.description, tags : req.body.tags, commentaire : req.body.commentaire,user :req.body.user});
    a.save(function (err,cat) {
        if(err) res.json({error : err});
        res.json(cat);
    });
});

/*GET Récupérer une annonce*/
router.get('/:id', function (req, res) {
    models.annonce.findById(req.params.id).populate('user').exec(function (err , cat) {
        if(err) res.json({error : err});
        res.json(cat);
    })
});

/*GET Récupérer une annonce et son utilisateur*/
router.get('/', function(req, res, next) {
    models.annonce.find({}).populate('user').exec(function (err, annonces) {
        if(err) res.json({error : err});
        res.json(annonces);
    });
});

router.get('/byUser/:id', function(req, res, next) {
    models.annonce.find({user : req.params.id}).populate('user annonce').exec(function (err, annonces) {
        if(err) res.json({error : err});
        res.json(annonces);
    });
});



/*PUT Modifier une annonce*/
router.put('/:id', function (req, res) {
    models.annonce.findByIdAndUpdate(req.params.id,{titre : req.body.titre,ville_depart : req.body.ville_depart, ville_arrivee : req.body.ville_arrivee,
            date : req.body.date,image : req.body.image ,argent : req.body.argent,categorie : req.body.categorie,status : req.body.status,
            description : req.body.description, tags : req.body.tags, commentaire : req.body.commentaire,user : req.body.user},
        {new : true}, function (err , cat) {
            if(err) res.json({error : err});
            res.json(cat);
        })
});

/*DELETE Supprimer une annonce*/
router.delete('/:id', function (req, res) {
    models.annonce.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : err});
        return res.json({done : 1});
    })
});

router.post('/updateImg/:id', upload,function (req, res) {


    upload(req,res,function(err){

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        console.log(req.file.filename);
        console.log(req.params.id);
        models.annonce.findByIdAndUpdate(req.params.id,{image : req.file.filename},{new : true}, function (err , user) {
            if(err) res.json({err:err});

        });

        res.json({error_code:0,err_desc:null});

    })
});
router.post('/find/', function(req, res){



    var titre = req.body.titre;
    var ville_depart = req.body.ville_depart;
    var ville_arrivee= req.body.ville_arrivee;






    var query = Annonce.find({});




    if(titre){
        query = query.where('titre').equals(titre);
    }

    if(ville_depart){
        query = query.where('ville_depart').equals(ville_depart);
    }

    if(ville_arrivee){
        query = query.where('ville_arrivee').equals(ville_arrivee);
    }




    query.exec(function(err, cat){
        if(err)
            res.send(err);
        else
            res.json(cat);
    });
});



module.exports = router;
