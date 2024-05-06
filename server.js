// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const utilisateurRoutes = require('./routes/utilisateurRoutes');
const locationRoutes = require('./routes/locationRoutes');
const bienRoutes = require('./routes/bienRoutes');
const { url } = require('./config/database');


const app = express();

// Middleware pour autoriser les requêtes de n'importe quelle origine
app.use(cors());

const PORT = process.env.PORT || 3033;

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


// Utilisation des routes définies dans les fichiers routes
app.use('/api', utilisateurRoutes);
app.use('/api', locationRoutes);
app.use('/api', bienRoutes);


// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//ajouter les logs

