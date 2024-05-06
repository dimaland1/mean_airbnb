// backend/controllers/locationController.js

const Location = require('../models/location');
const Bien = require('../models/bien');

exports.noteLocation = async (req, res) => {
    try {
        let id = req.body.idLoc;
        const updatedLocation = await Location.findOneAndUpdate(
            { idLocation: id}, // Recherche par idLocation
            { note: req.body.val }, 
            { new: true }
        );

        if (updatedLocation) {
            console.log(req.body.val + " --- " + updatedLocation.note);
            
            // Mise à jour de la moyenne dans les biens
            refreshMoyenne(updatedLocation.idBien);


            return res.status(200).json({ message: 'Avis ajouté' });


        } else {
            return res.status(404).json({ message: 'Location non trouvée' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

async function refreshMoyenne(idBien) {
    const locations = await Location.find({ idBien: idBien });
    let sum = 0;
    let count = 0;

    console.log(sum);

    for (let i = 0; i < locations.length; i++) {
        if(locations[i].note != null){
            sum = sum + locations[i].note;
            count++;
        }
    }

    let moyenne = sum / count;

    console.log("Moyenne : " + moyenne);

    const updated = await Bien.findOneAndUpdate(
        { idBien: idBien }, // Recherche par idBien
        { moyenne: Math.floor(moyenne) }, 
        { new: true }
    );
    
}


exports.getLocationByMail = async (req, res) => {
    try {
        const location = await Location.find({ mailLoueur: req.params.mail });

        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'Location non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer une nouvelle location
exports.createLocation = async (req, res) => {
    try {
        let lastID = await Location.find().sort({ idLocation: -1 }).limit(1);
        const nouvelleLocation = new Location(req.body);

        let id = 0
        if (lastID.length == 0) {
            id = 1;
        }else{
            id = lastID[0].idLocation + 1;
        }
    
        nouvelleLocation.idLocation = id;
        
        const locationEnregistree = await nouvelleLocation.save();
        res.status(201).json(locationEnregistree);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir toutes les locations
exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une location par son ID
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'Location non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une location
exports.updateLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'Location non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une location
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (location) {
            res.json({ message: 'Location supprimée' });
        } else {
            res.status(404).json({ message: 'Location non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
