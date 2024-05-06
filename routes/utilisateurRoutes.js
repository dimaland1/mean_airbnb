const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilistateurController');

router.post('/creerUtilisateur', utilisateurController.createUtilisateur);
router.get('/utilisateurs', utilisateurController.getUtilisateurs);
router.post('/login', utilisateurController.login);
router.get('/utilisateurs/:id', utilisateurController.getUtilisateurById);
router.put('/utilisateurs/:id', utilisateurController.updateUtilisateur);
router.delete('/utilisateurs/:id', utilisateurController.deleteUtilisateur);

module.exports = router;


