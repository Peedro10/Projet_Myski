const express = require('express');
const router = express.Router();
const {
    getCommentairesPistes,
    addCommentairePiste,
    deleteCommentairePiste,
    updateCommentairePiste
} = require('../controllers/commentaires_pistes.cjs');

router.get('/:pisteId', getCommentairesPistes);
router.post('/:pisteId', addCommentairePiste);  // Assurez-vous que cette URL correspond à celle que vous postez

// Delete a comment
router.delete('/:id_commentaire', deleteCommentairePiste);

// Update a comment
router.put('/:id_commentaire', updateCommentairePiste);

module.exports = router;
