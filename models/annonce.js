var mongoose = require('../config/db');
var AnnonceSchema = mongoose.Schema({
    titre: String,
    ville_depart: String,
    ville_arrivee: String,
    date: Date,
    image: String,
    argent: Number,
    categorie: String,
    status: ["Actif","Bloqué"],
    description: String,
    tags: [String],
    commentaire: [Object],
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'Account'}

});
module.exports = mongoose.model('Annonce', AnnonceSchema);