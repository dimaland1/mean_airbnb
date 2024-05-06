const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/creerLocations', locationController.createLocation);
router.get('/locations', locationController.getLocations);
router.get('/locations/:mail', locationController.getLocationByMail);
router.put('/locations/:id', locationController.updateLocation);
router.post('/avisLocation', locationController.noteLocation);
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;