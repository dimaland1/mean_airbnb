// backend/models/location.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    idLocation: { type: Number, required: true },
    idBien: { type: Number, ref: 'Bien', required: true },
    mailLoueur: { type: String, ref: 'Utilisateur', required: true },
    dateDebut: { type: String, required: true },
    dateFin: { type: String, required: true },
    avis: String,
    note: Number
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

