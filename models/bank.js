/**
 * Created by hassine on 3/29/2016.
 */
var mongoose = require('../config/db');
var BankSchema = mongoose.Schema({
    balance: {type : Number, default : 0},
    inTransction : [
        {
            from :
            {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
            date :
            { type: Date, default: Date.now },
            amount : Number,
            status : String,
            demand :  mongoose.Schema.Types.ObjectId,
            announcement : mongoose.Schema.Types.ObjectId,
        }
    ],
    outTransaction : [
        {
            to :
            {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
            date :
            { type: Date, default: Date.now },
            amount : Number,
            status : String,
            demand :  mongoose.Schema.Types.ObjectId,
            announcement : mongoose.Schema.Types.ObjectId,
        }
    ],
    fundTransaction : [
        {
            date :
            { type: Date, default: Date.now },
            amount : Number,
            status : String,
        }
    ],
    retrieveTransaction : [
        {
            date :
            { type: Date, default: Date.now },
            amount : Number,
            status : String,
        }
    ],
    owner : {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
});
module.exports = mongoose.model('Bank', BankSchema);