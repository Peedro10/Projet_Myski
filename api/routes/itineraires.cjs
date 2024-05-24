const express = require('express');
const router = express.Router();
const {
    getItineraires,
    addItineraire,
    deleteItineraire
} = require('../controllers/itineraires.cjs');

// Récupérer tous les itinéraires
router.get('/', getItineraires);

// Ajouter un itinéraire
router.post('/', addItineraire);

// Supprimer un itinéraire
router.delete('/:id', deleteItineraire);

module.exports = router;
