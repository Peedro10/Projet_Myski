// routes/remontees.cjs
const express = require('express');
const router = express.Router();
const { getRemontees, getRemonteeById, updateRemontee, addRemontee } = require('../controllers/remontee.cjs');

// Obtenir toutes les remontées
router.get('/', getRemontees);

// Obtenir une remontée spécifique par son ID
router.get('/:id', getRemonteeById);

// Mettre à jour une remontée
router.put('/:id', updateRemontee);

// Ajouter une nouvelle remontée
router.post('/', addRemontee);

module.exports = router;
