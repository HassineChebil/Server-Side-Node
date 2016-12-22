/**
 * Created by hassine on 3/17/2016.
 */

var mongoose = require('../config/db');

var CategorySchema = mongoose.Schema({
    name : String,
    posts :[{type : mongoose.Schema.Types.ObjectId, ref : 'Post'}]
});

module.exports = mongoose.model('Category',CategorySchema);
