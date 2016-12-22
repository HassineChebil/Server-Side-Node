/**
 * Created by hassine on 4/1/2016.
 */

var models = require('../models');
var express = require('express');
var router = express.Router();

router.put('/traveler/:id', function (req,res) {
    models.account.find({_id : req.params.id}, function (err,account) {

       if (err) res.json({error : err});

        account[0].evaluationAsTraveler.evaluators.push({owner : req.body.user, note : Number(req.body.note)});
        var evaluators = account[0].evaluationAsTraveler.evaluators;


        var countingTotal = 0;
        console.log(account[0]);
        for(var i=0 ; i < evaluators.length; i++){
            countingTotal += Number(evaluators[i].note);
        }
        var count = account[0].evaluationAsTraveler.evaluators.length;
        var evaTotTraveler = (Number(countingTotal))/count;
        var evaTotSeeker = Number(account[0].evaluationAsSeeker.total);
        var evaTotal = Number((evaTotTraveler+evaTotSeeker)/2);

       models.account.update(
            {_id: account[0]._id},
            {$set: {'evaluationAsTraveler.evaluators':  account[0].evaluationAsTraveler.evaluators,'evaluationAsTraveler.total' : evaTotTraveler, evaTotal: evaTotal}},
            function (err, account) {
                if (err) res.json({error : true, err :err});
                res.json({success : true});
            });

    });
});


router.put('/seeker/:id', function (req,res) {
    models.account.find({_id : req.params.id}, function (err,account) {
        if (err) res.json({error : err});

        account[0].evaluationAsSeeker.evaluators.push({owner : req.body.user, note : Number(req.body.note)});
        var evaluators = account[0].evaluationAsSeeker.evaluators;
        var countingTotal = 0;
        for(var i=0 ; i < evaluators.length; i++){
            countingTotal = countingTotal + evaluators[i].note;
        }
        var count = account[0].evaluationAsSeeker.evaluators.length;
        var evaTotTraveler = Number(account[0].evaluationAsTraveler.total);
        var evaTotSeeker = (Number(countingTotal))/count;
        var evaTotal = (evaTotTraveler+evaTotSeeker)/2;
        models.account.update(
            {_id: account[0]._id},
            {$set: {'evaluationAsSeeker.evaluators':  account[0].evaluationAsSeeker.evaluators,'evaluationAsSeeker.total' : evaTotSeeker, evaTotal: evaTotal}},
            function (err, account) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });
});

router.put('/avisSeeker/:id', function (req,res) {
    models.account.find({_id : req.params.id}, function (err,account) {
        if (err) res.json({error : {success : false}});

        account[0].evaluationAsSeeker.avis.push({owner : req.body.user, message : req.body.message});
        models.account.update(
            {_id: account[0]._id},
            {$set: {'evaluationAsSeeker.avis':  account[0].evaluationAsSeeker.avis}},
            function (err, account) {
                if (err) res.json({success : false});
                res.json({success : true});
            });

    });
});

router.put('/avisTraveler/:id', function (req,res) {
    models.account.find({_id : req.params.id}, function (err,account) {
        if (err) res.json({error : {success : false}});
        console.log({loggedUser : req.body.user});
        account[0].evaluationAsTraveler.avis.push({owner : req.body.user, message : req.body.message});
        models.account.update(
            {_id: account[0]._id},
            {$set: {'evaluationAsTraveler.avis':  account[0].evaluationAsTraveler.avis}},
            function (err, account) {
                if (err) res.json({success : false});
                res.json({success : true});
            });

    });
});

module.exports = router;