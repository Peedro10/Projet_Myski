const express = require('express');
const router = express.Router();
const {
    getCommentairesRemontees,
    addCommentaireRemontee,
    deleteCommentaireRemontee,
    updateCommentaireRemontee
} = require('../controllers/commentaires_remontees.cjs');

// Get all comments for a remontée
router.get('/:remonteeId', getCommentairesRemontees);

// Add a comment to a remontée
router.post('/:remonteeId', addCommentaireRemontee);  // Assurez-vous que cela correspond à l'URL que vous postez

// Delete a comment
router.delete('/:id_commentaire', deleteCommentaireRemontee);

// Update a comment
router.put('/:id_commentaire', updateCommentaireRemontee);

module.exports = router;
