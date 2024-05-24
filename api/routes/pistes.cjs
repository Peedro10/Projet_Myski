// routes/pistes.cjs
const express = require('express');
const router = express.Router();
const { getPistes, getPisteById, updatePiste, addPiste } = require('../controllers/piste.cjs');

// Obtenir toutes les pistes
router.get('/', getPistes);

// Obtenir une piste spécifique par son ID
router.get('/:id', getPisteById);

// Mettre à jour une piste par son ID
router.put('/:id', updatePiste);

// Ajouter une nouvelle piste
router.post('/', addPiste);

module.exports = router;



