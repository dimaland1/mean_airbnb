// backend/models/bien.js

const mongoose = require('mongoose');

const bienSchema = new mongoose.Schema({
    idBien: { type: Number, required: true },
    mailProprio: { type: String, ref: 'Utilisateur', required: true },
    commune: { type: String, required: true },
    rue: String,
    cp: String,
    nbCouchages: Number,
    nbChambres: Number,
    distance: Number,
    prix: Number,
    imageUrl: String,
    moyenne: Number,
});

const Bien = mongoose.model('Bien', bienSchema);

module.exports = Bien;

