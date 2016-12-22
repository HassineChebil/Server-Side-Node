var mongoose = require('../config/db');

var passportLocalMongoose = require('passport-local-mongoose');

var Account = mongoose.Schema({
    /*local: {*/
    email : {type: String, unique: true} ,
    password: String,
    /*},*/
    fName : String,
    lName : String,
    tel : String,
    image : String,
    airport : String,
    address : String,
    town : String,
    dist : String,
    postal : Number,
    country : String,
    evaluationAsTraveler : {
                    total : {type : Number, default : 0},
                    evaluators : [
                            {owner : {type : mongoose.Schema.Types.ObjectId , ref : 'Account'},
                            note : {type : Number, default : 0}
                            }
                    ],
        avis : [{owner : {type : mongoose.Schema.Types.ObjectId , ref : 'Account'},created : {type : Date, default: Date.now }, message : String}]
                },
    evaluationAsSeeker : {
        total : {type : Number, default : 0},
        evaluators : [
            {owner : {type : mongoose.Schema.Types.ObjectId , ref : 'Account'},
                note : {type : Number, default : 0}
            }
        ],
        avis : [{owner : {type : mongoose.Schema.Types.ObjectId , ref : 'Account'},created : {type : Date, default: Date.now }, message : String}]
    },
    evaTotal : {type : Number, default: 0},
    created : {type : Date, default : Date.now},
    avis : [{owner : {type : mongoose.Schema.Types.ObjectId , ref : 'Account'},created : {type : Date, default: Date.now }, message : String}]
});

/*Account.pre('save', function(next){
    var user = this;

    //check if password is modified, else no need to do anything
    if (!user.isModified('pass')) {
        return next()
    }

    user.pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    next()
});*/

Account.plugin(passportLocalMongoose, {usernameField: "email"});
module.exports = mongoose.model('Account', Account);