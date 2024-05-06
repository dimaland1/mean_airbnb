// backend/controllers/bienController.js

const Bien = require('../models/bien');
const location = require('../models/location');

exports.getBienByMail = async (req, res) => {
    try {

        console.log('req.params.mailProprio : ', req.params.mailProprio);
        // retourner tous les biens d'un propriétaire
        const biens = await Bien.find({ mailProprio: req.params.mailProprio });
        res.json(biens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBien = async (req, res) => {
    try {
        const token = req.headers.authorization;
        // Verify and decode the token here
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        console.log('req.body', req.body);

        const nouveauBien = new Bien(req.body);

        // avoir le dernier idBien
        const lastID = await Bien.find().sort({ idBien: -1 }).limit(1);

        if(lastID.length == 0) {
            nouveauBien.idBien = 1;
        }else{
            let id = lastID[0].idBien + 1;
            nouveauBien.idBien = id;
        }
    

        console.log(nouveauBien)

        const bienEnregistre = await nouveauBien.save();
        res.status(201).json(bienEnregistre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir tous les biens
exports.getBiens = async (req, res) => {
    try {
        let biens = await Bien.find();
        let locations = await location.find();

        let params = req.query;

        let DateDebut = new Date(params.dateDebut);
        let DateFin = new Date(params.dateFin);
        let localisation = params.localisation;

        let minBeds = params.minBeds || -1;
        let minRooms = params.minRooms || -1;
        let maxPrix = params.maxPrix || -1;
        let distance = params.maxDistance || -1;

        console.log('-----------------------------------')
        console.log('minBeds', minBeds);
        console.log('minRooms', minRooms);
        console.log('maxPrix', maxPrix);
        console.log('distance', distance);
        console.log('localisation', localisation);
        console.log('DateDebut', DateDebut);
        console.log('DateFin', DateFin);
        console.log('-----------------------------------')

        if (params.dateDebut && params.dateFin) {
            biens = biens.filter(bien => {
                let prixTotal = bien.prix * ((DateFin - DateDebut) / (1000 * 60 * 60 * 24));

            
                let overlap = false;

                for(let i = 0; i < locations.length; i++) {
                    if(locations[i].idBien === bien.idBien) {

                        let dateFinLocation = new Date(locations[i].dateFin);
                        if(DateDebut <= dateFinLocation) {
                            console.log('dateFinLocation', locations[i].dateFin)
                            console.log('DateDebut', DateDebut)
                            overlap = true;
                        }
                    }
                }

                if (!overlap) {
                    // lowercase 
                    bien.commune = bien.commune.toLowerCase()
                    console.log("chambre", minRooms)
                    console.log("bien.nbChambres", bien.nbChambres)


                    if (prixTotal <= maxPrix) {
                        if (localisation === bien.commune) {
                            if (bien.distance <= distance) {
                    
                                if (minBeds <= bien.nbCouchages) {
                                    if (minRooms <= bien.nbChambres) {
                                        console.log("ici cela fini avec minRooms defined, minBeds defined, maxprix defined et distance defined")
                                        return bien;
                                    }

                                    if (minRooms <= 0) {
                                        console.log("ici cela fini avec minRooms undefined, minBeds defined, maxprix defined et distance defined")
                                        return bien;
                                    }
                                }

                                if (minBeds <= 0) {
                                    if (minRooms <= bien.nbChambres) {
                                        console.log("ici cela fini avec minRooms defined, minBeds undefined, maxprix defined et distance defined")
                                        return bien;
                                    }

                                    if (minRooms <= 0) {
                                        //console.log("ici cela fini avec minRooms undefined, minBeds undefined, maxprix defined et distance defined")
                                        return bien;
                                    }
                                }
                            }

                            if (distance <= 0) {
                                if (localisation === bien.commune) {
                                    if (minBeds <= bien.nbCouchages) {
                                        if (minRooms <= bien.nbChambres) {
                                            console.log("ici cela fini avec minRooms defined, minBeds defined, maxprix defined et distance undefined")
                                            return bien;
                                        }

                                        if (minRooms <= 0) {
                                            console.log("ici cela fini avec minRooms undefined, minBeds defined, maxprix defined et distance undefined")
                                            return bien;
                                        }
                                    }

                                    if (minBeds <= 0) {
                                        if (minRooms <= bien.nbChambres) {
                                            console.log("ici cela fini avec minRooms defined, minBeds undefined, maxprix defined et distance undefined")
                                            return bien;
                                        }

                                        if (minRooms <= 0) {
                                            console.log("ici cela fini avec minRooms undefined, minBeds undefined, maxprix defined et distance undefined")
                                            return bien;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    console.log("maxPrix", maxPrix);
                    if (maxPrix <= 0) {
                        if (localisation === bien.commune) {
                            if (distance >= bien.distance) {
                                if (minBeds <= bien.nbCouchages) {
                                    
                                    if (minRooms >= bien.nbChambres) {
                                        console.log("ici cela fini avec minRooms defined, minBeds defined, maxprix defined et distance defined")
                                        return bien;
                                    }

                                    if (minRooms <= 0) {
                                        console.log("ici cela fini avec minRooms undefined, minBeds defined, maxprix defined et distance defined")
                                        return bien;
                                    }
                                }

                                if (minBeds <= 0) {
                                    if (minRooms <= bien.nbChambres) {
                                        console.log("ici cela fini avec minRooms defined, minBeds undefined, maxprix defined et distance defined")
                                        return bien;
                                    }

                                    if (minRooms <= 0) {
                                        console.log("ici cela fini avec minRooms undefined, minBeds undefined, maxprix defined et distance defined")
                                        return bien;
                                    }
                                }
                            }

                            if (distance <= 0) {
                                if (minBeds <= bien.nbCouchages) {
                                    if (minRooms <= bien.nbChambres) {
                                        console.log("ici cela fini avec minRooms defined, minBeds defined, maxprix defined et distance undefined")
                                        return bien;
                                    }

                                    if (minRooms <= 0) {
                                        console.log("ici cela fini avec minRooms undefined, minBeds defined, maxprix defined et distance undefined")
                                        return bien;
                                    }
                                }

                                if (minBeds <= 0) {
                                    if (minRooms <= bien.nbChambres) {
                                        console.log("ici cela fini avec minRooms defined, minBeds undefined, maxprix defined et distance undefined")
                                        return bien;
                                    }

                                    if (minRooms <= 0) {
                                        console.log("ici cela fini avec minRooms undefined, minBeds undefined, maxprix defined et distance undefined")
                                        return bien;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        } else {
            return res.status(400).json({ message: 'Veuillez saisir une date de début et une date de fin' });
        }

        if (DateDebut > DateFin) {
            return res.status(400).json({ message: 'La date de début doit être inférieure à la date de fin' });
        }



        res.json(biens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Obtenir un bien par son ID
exports.getBienById = async (req, res) => {
    try {
        // rechercer par idBien
        const bien = await Bien.find({ idBien: req.params.id });
        if (bien) {
            res.json(bien);
        } else {
            res.status(404).json({ message: 'Bien non trouvé' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un bien
exports.updateBien = async (req, res) => {
    try {
        const token = req.headers.authorization;
        // Verify and decode the token here
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        // trouver le bien par idBien
        console.log(req.body)
        const bien = await Bien.findOneAndUpdate({ idBien: req.body.idBien }, req.body, {
            new: true
        });

        if (bien) {
            res.json(bien);
        } else {
            res.status(404).json({ message: 'Bien non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un bien
exports.deleteBien = async (req, res) => {
    try {
        // trouver le bien par idBien
        const bien = await Bien.find({ idBien: req.params.id });

        //supprimer le bien
        const bienSupprime = await Bien.deleteOne({ idBien: req.params.id });

        if (bienSupprime) {
            res.json({ message: 'Bien supprimé' });
        } else {
            res.status(404).json({ message: 'Bien non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
