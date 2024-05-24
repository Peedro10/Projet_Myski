const { connection } = require("../connect.cjs");

exports.getCommentairesRemontees = (req, res) => {
    const remonteeId = req.params.remonteeId;
    const query = 'SELECT commentaires_remontees.*, users.username FROM commentaires_remontees JOIN users ON commentaires_remontees.id_user = users.id WHERE id_remonte = ?';
    connection.query(query, [remonteeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.addCommentaireRemontee = (req, res) => {
    const { contenu, id_user, id_remonte } = req.body;

    if (!id_remonte || !contenu || !id_user) {
        return res.status(400).json({ error: "id_remonte, contenu, and id_user cannot be null" });
    }

    const query = "INSERT INTO commentaires_remontees (contenu, id_user, id_remonte) VALUES (?, ?, ?)";
    connection.query(query, [contenu, id_user, id_remonte], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const insertId = result.insertId;
        const selectQuery = "SELECT commentaires_remontees.*, users.username FROM commentaires_remontees JOIN users ON commentaires_remontees.id_user = users.id WHERE commentaires_remontees.id_commentaire = ?";
        connection.query(selectQuery, [insertId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result[0]);
        });
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
