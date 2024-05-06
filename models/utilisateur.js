// backend/models/utilisateur.js

const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    telephone: String,
    motDePasse: { type: String, required: true },
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;

