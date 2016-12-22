/**
 * Created by chiheb on 11/04/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/vol/:dest/:depart', function(req, res, next) {
    request({
        uri : "http://www.tunisie-web.org/horaire-vols/"+ req.params.dest
    }, function(error, response, body){
        console.log(error);
    });
    request({
        uri : "http://www.tunisie-web.org/horaire/"+ req.params.dest +"_vols_A.json?_=1456585878477"
    }, function(error, response, body) {
        var fs = require('fs');
        var produits = JSON.parse(body);
        var exist = [];
        for(var i = 0; i < produits.aaData.length;i++){
            if(produits.aaData[i].dest == req.params.depart)
            {
                exist.push(produits.aaData[i]);
            }
        }
        res.json(exist);
    });
});

router.get('/train/:dest/:depart', function(req, res, next) {
    request({
        uri : "http://www.tunisie-web.org/horaire-trains/"+ req.params.dest
    }, function(error, response, body){
        console.log(error);
    });
    request({
        uri : "http://www.tunisie-web.org/horaire/"+ req.params.dest +"_trains_A.json?_=1457285734087"
    }, function(error, response, body) {
        var fs = require('fs');
        var exist = [];
        if(JSON.parse(body))
        {
            var produits = JSON.parse(body);
            for(var i = 0; i < produits.aaData.length;i++){
                if(produits.aaData[i][0].indexOf(req.params.depart) != -1)
                {
                    exist.push(produits.aaData[i]);
                }
            }
        }
        res.json(exist);
    });
});

module.exports = router;