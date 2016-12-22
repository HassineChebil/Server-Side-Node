/**
 * Created by hassine on 3/28/2016.
 */

var mongoose = require('../config/db');
var SafeSchema = mongoose.Schema({
    balance: {type : Number, default : 0},
    inTransction : [
        {
            from :
                {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
            date :
                { type: Date, default: Date.now },
            amount : Number
        }
    ],
    outTransaction : [
        {
            to :
                {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
            date :
                { type: Date, default: Date.now },
            amount : Number
        }
    ]
});
module.exports = mongoose.model('Safe', SafeSchema);
