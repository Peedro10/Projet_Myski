const { connection } = require("../connect.cjs");

// Récupérer tous les commentaires sur les remontées mécaniques
exports.getCommentairesRemontees = (req, res) => {
    const remonteeId = req.params.remonteeId;
    const query = 'SELECT commentaires_remontees.*, users.username FROM commentaires_remontees JOIN users ON commentaires_remontees.id_user = users.id WHERE id_remontee = ?';
    connection.query(query, [remonteeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Ajouter un commentaire sur une remontée mécanique
exports.addCommentaireRemontee = (req, res) => {
    const { contenu, id_user, id_remontee } = req.body;

    if (!id_remontee || !contenu || !id_user) {
        return res.status(400).json({ error: "id_remontee, contenu, and id_user cannot be null" });
    }

    const query = "INSERT INTO commentaires_remontees (contenu, id_user, id_remontee) VALUES (?, ?, ?)";
    connection.query(query, [contenu, id_user, id_remontee], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Commentaire ajouté avec succès", id: result.insertId });
    });
};

// Supprimer un commentaire sur une remontée mécanique
exports.deleteCommentaireRemontee = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM commentaires_remontees WHERE id_commentaire = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }
        res.status(200).json({ message: "Commentaire supprimé avec succès" });
    });
};

// Mettre à jour un commentaire sur une remontée mécanique
exports.updateCommentaireRemontee = (req, res) => {
    const { contenu } = req.body;
    const { id } = req.params;
    const query = "UPDATE commentaires_remontees SET contenu = ? WHERE id_commentaire = ?";
    connection.query(query, [contenu, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }
        res.status(200).json({ message: "Commentaire mis à jour avec succès" });
    });
};
