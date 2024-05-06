const mongoose = require('mongoose');
const { random } = require('faker'); // Utiliser Faker pour générer des données aléatoires

// Schémas
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
});

const utilisateurSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    telephone: String,
    motDePasse: { type: String, required: true },
});

// Modèles
const Bien = mongoose.model('Bien', bienSchema);
const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/mean_airbnb3', { useNewUrlParser: true, useUnifiedTopology: true });

// Fonction pour peupler la base de données
async function peuplerBaseDeDonnees() {
    try {
        // Créer des utilisateurs
        const utilisateurs = await Utilisateur.create([
            { mail: 'utilisateur1@example.com', prenom: 'John', nom: 'Doe', telephone: '123456789', motDePasse: 'motdepasse1' },
            { mail: 'utilisateur2@example.com', prenom: 'Jane', nom: 'Smith', telephone: '987654321', motDePasse: 'motdepasse2' }
        ]);

        const biens = [
            { idBien: 4, mailProprio: utilisateurs[0].mail, commune: 'Nîmes', rue: 'Rue des Papes', nbCouchages: 4, nbChambres: 2, prix: 100, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 5, mailProprio: utilisateurs[1].mail, commune: 'Montpellier', rue: 'Rue des Papes', nbCouchages: 6, nbChambres: 3, prix: 150, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 6, mailProprio: utilisateurs[0].mail, commune: 'Paris', rue: 'Rue des Papes', nbCouchages: 5, nbChambres: 2, prix: 120, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 7, mailProprio: utilisateurs[1].mail, commune: 'Bordeaux', rue: 'Rue des Papes', nbCouchages: 8, nbChambres: 4, prix: 200, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 8, mailProprio: utilisateurs[0].mail, commune: 'Montpellier', rue: 'Rue des Velos', nbCouchages: 4, nbChambres: 2, prix: 100, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 9, mailProprio: utilisateurs[1].mail, commune: 'Montpellier', rue: 'Rue des Papes', nbCouchages: 6, nbChambres: 3, prix: 50, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 10, mailProprio: utilisateurs[0].mail, commune: 'Paris', rue: 'Rue des frelons', nbCouchages: 5, nbChambres: 2, prix: 232, imageUrl: 'https://via.placeholder.com/150' },
            { idBien: 11, mailProprio: utilisateurs[1].mail, commune: 'Bordeaux', rue: 'Rue des Papes', nbCouchages: 8, nbChambres: 4, prix: 68, imageUrl: 'https://via.placeholder.com/150' },
        ];

        console.log('Base de données peuplée avec succès !');
    } catch (error) {
        console.error('Erreur lors du peuplement de la base de données :', error);
    } finally {
        // Déconnexion de la base de données
        mongoose.disconnect();
    }
}

// Appeler la fonction pour peupler la base de données
peuplerBaseDeDonnees();
