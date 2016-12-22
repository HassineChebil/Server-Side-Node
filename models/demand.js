/**
 * Created by chiheb on 25/03/2016.
 */
var mongoose = require('../config/db');

var DemandSchema = mongoose.Schema({
    content : String,
    type : String,
    price: {type : Number, default : 0},
    fees: {type : Number, default : 10},
    date : Date,
    image : String,
    status : String,
    appointment : { date : Date, address : String, latitude : Number, longitude : Number },
    created_date: { type: Date, default: Date.now },
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'Account'}
});

module.exports = mongoose.model('Demand',DemandSchema);