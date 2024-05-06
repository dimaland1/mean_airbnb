// backend/controllers/utilisateurController.js
const Utilisateur = require('../models/utilisateur');
const jwt = require('jsonwebtoken');

//login
// utiliser jwt acces token
exports.login = async (req, res) => {

    try {
        const { mail, motDePasse } = req.body;
        const utilisateur = await Utilisateur.findOne({ mail });

        if (utilisateur && (await utilisateur.motDePasse === motDePasse)) {

            const token = jwt.sign(
                { userId: utilisateur._id, email: utilisateur.email }, // Contenu du token (payload)
                'votre_secret_key', // Clé secrète pour signer le token (veillez à la garder sécurisée)
                { expiresIn: '1h' } // Optionnel : expiration du token
            );

            res.json({
                _id: utilisateur._id,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                token: token,
            });
        }
        else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel utilisateur
exports.createUtilisateur = async (req, res) => {
    try {
        const nouvelUtilisateur = new Utilisateur(req.body);
        const utilisateurEnregistre = await nouvelUtilisateur.save();
        res.status(201).json(utilisateurEnregistre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir tous les utilisateurs
exports.getUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.json(utilisateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un utilisateur par son ID
exports.getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (utilisateur) {
            res.json(utilisateur);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
exports.updateUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (utilisateur) {
            res.json(utilisateur);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur
exports.deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
        if (utilisateur) {
            res.json({ message: 'Utilisateur supprimé' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

