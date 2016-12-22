/**
 * Created by hassine on 3/28/2016.
 */


var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET safe info. */
router.get('/', function(req, res, next) {
    models.safe.find({}).populate('inTransction.from').exec(function(err, safe){
        if(err) res.json({error: err});
        res.json(safe);
    });
});

/*POST add safe used only once*/
router.post('/', function (req, res) {
    var c = new models.safe();
    c.save(function (err,safe) {
        if(err) res.json({error : err});
        res.json(safe);
    });
});


/*PUT Update safe info in transactions*/
router.put('/in', function (req, res) {
    models.safe.find({}, function (err, safe) {

        safe[0].inTransction.push({from : req.body.user , amount : req.body.amount});
        models.safe.update(
            {_id: safe[0]._id},
            {$set: {inTransction: safe[0].inTransction, outTransaction: safe[0].outTransaction , balance: Number(safe[0].balance) + Number(req.body.amount)}},
            function (err, safe) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });

});

/*PUT Update safe info out transactions*/
router.put('/out', function (req, res) {
    models.safe.find({}, function (err, safe) {

        safe[0].outTransaction.push({to : req.body.user , amount : req.body.amount});
        models.safe.update(
            {_id: safe[0]._id},
            {$set: {inTransction: safe[0].inTransction, outTransaction: safe[0].outTransaction , balance: Number(safe[0].balance) - Number(req.body.amount)}},
            function (err, safe) {
                if (err) res.json({error : true});
                res.json({success : true});
            });

    });
});



/*DELETE Delete safe*/
router.delete('/:id', function (req, res) {
    models.safe.findByIdAndRemove(req.params.id,function (err) {
        if(err) res.json({error : true});
        return res.json({success : true});
    })
});


module.exports = router;