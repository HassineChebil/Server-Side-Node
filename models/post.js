/**
 * Created by hassine on 3/17/2016.
 */

var mongoose = require('../config/db');

var PostSchema = mongoose.Schema({
    title : String,
    content : String,
    tags : [String],
    _category :[{type : mongoose.Schema.Types.ObjectId, ref : 'Category'}]
});

module.exports = mongoose.model('Post',PostSchema);
