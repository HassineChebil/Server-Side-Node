var mongoose = require('../config/db');
var DemandeurSchema = mongoose.Schema({
    name: String
});
module.exports = mongoose.model('Demandeur', DemandeurSchema);