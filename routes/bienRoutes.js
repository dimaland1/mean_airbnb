const express = require('express');
const router = express.Router();
const bienController = require('../controllers/bienController');

router.post('/creerBiens', bienController.createBien);
router.get('/biens', bienController.getBiens);
router.get('/biens/:id', bienController.getBienById);
router.post('/modifierBiens', bienController.updateBien);
router.delete('/supprimerBiens/:id', bienController.deleteBien);

router.get('/biensProprio/:mailProprio', bienController.getBienByMail);

module.exports = router;

