
var mongoose = require('../config/db');

var TravelSchema = mongoose.Schema({
    titre : String,
    description : String,
    destination : String,
    date_dep: Date,
    date_arr: Date,
    type_trens: String ,
    quan_trens: Number,
    image : String,
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'Account'},
    demand : [{type : mongoose.Schema.Types.ObjectId, ref : 'Demand'}],
    tags: [String],
    commentaire: [{}]

});

module.exports = mongoose.model('Travel',TravelSchema);

