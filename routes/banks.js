/**
 * Created by hassine on 3/29/2016.
 */


var models = require('../models');
var express = require('express');
var router = express.Router();


router.get('/:id',function(req,res){
    models.bank.find({owner : req.params.id}).populate('owner inTransction.from outTransaction.to').exec(function(err,bank){
        res.json(bank);
    });
});

/*PUT Update bank info in transactions*/
router.put('/in/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {
        console.log(bank[0]);
        bank[0].inTransction.push({from : req.body.user , amount : req.body.amount, status : "On Hold",demand : req.body.demand, announcement : req.body.announce});

        models.bank.update(
            {_id: bank[0]._id},
            {$set: {inTransction: bank[0].inTransction, outTransaction: bank[0].outTransaction}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });

});

/*PUT Update bank info out transactions*/
router.put('/out/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {

        bank[0].outTransaction.push({to : req.body.user , amount : req.body.amount, status : "On Hold",demand : req.body.demand, announcement : req.body.announce});
        models.bank.update(
            {_id: bank[0]._id},
            {$set: {inTransction: bank[0].inTransction, outTransaction: bank[0].outTransaction}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });


});

/*PUT Update bank info in transactions*/
router.put('/inPay/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {

        var inTransaction = bank[0].inTransction;
        for (var i  =0 ; i< inTransaction.length ; i++){
            if(inTransaction[i].demand == req.body.inTransactionId){

                inTransaction[i].status = 'Done';
            }
        }

        models.bank.update(
            {_id: bank[0]._id},
            {$set: {balance: Number(bank[0].balance) + Number(req.body.amount), inTransction : inTransaction}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });

});

router.put('/outPay/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {
        var outTransaction = bank[0].outTransaction;
        for (var i  =0 ; i< outTransaction.length ; i++){
            if(outTransaction[i].demand == req.body.outTransactionId){
                outTransaction[i].status = 'Done';
            }
        }

        models.bank.update(
            {_id: bank[0]._id},
            {$set: {balance: Number(bank[0].balance) - Number(req.body.amount), outTransaction : outTransaction}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });
});



router.put('/fund/:id', function (req, res) {
    console.log("made it");
    models.bank.find({owner : req.params.id}, function (err, bank) {

        bank[0].fundTransaction.push({amount : req.body.amount});
         console.log(bank[0]);
         models.bank.update(
         {_id: bank[0]._id},
         {$set: {fundTransaction: bank[0].fundTransaction, retrieveTransaction: bank[0].retrieveTransaction , balance: Number(bank[0].balance) + Number(req.body.amount)}},
         function (err, bank) {
         if (err) res.json({error : true});
         res.json({success : true});
         });

    });

});


router.put('/retrieve/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {

        bank[0].retrieveTransaction.push({amount : req.body.amount});
        models.bank.update(
            {_id: bank[0]._id},
            {$set: {fundTransaction: bank[0].fundTransaction, retrieveTransaction: bank[0].retrieveTransaction , balance: Number(bank[0].balance) + Number(req.body.amount)}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });

});


router.put('/inPayBlock/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {

        var inTransaction = bank[0].inTransction;
        console.log("demand_id: " +req.body.inTransactionId);
        for (var i  =0 ; i< inTransaction.length ; i++){

            if(inTransaction[i].demand == req.body.inTransactionId){

                inTransaction[i].status = 'Blocked';
                console.log("tran status: "+inTransaction[i].status)
            }
        }


        models.bank.update(
            {_id: bank[0]._id},
            {$set: {inTransction : inTransaction}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });

});


router.put('/outPayBlock/:id', function (req, res) {
    models.bank.find({owner : req.params.id}, function (err, bank) {

        var outTransaction = bank[0].outTransaction;
        console.log("demand_id: " +req.body.outTransactionId);
        for (var i  =0 ; i< outTransaction.length ; i++){
            if(outTransaction[i].demand == req.body.outTransactionId){
                outTransaction[i].status = 'Blocked';
                console.log("tran status: "+outTransaction[i].status)
            }
        }


        models.bank.update(
            {_id: bank[0]._id},
            {$set: {outTransaction : outTransaction}},
            function (err, bank) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });

});





module.exports = router;