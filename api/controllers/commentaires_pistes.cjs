const { connection } = require("../connect.cjs");

exports.getCommentairesPistes = (req, res) => {
    const pisteId = req.params.pisteId;
    const query = `
        SELECT cp.*, u.username 
        FROM commentaires_pistes cp
        JOIN users u ON cp.id_user = u.id
        WHERE cp.id_piste = ?
    `;
    connection.query(query, [pisteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.addCommentairePiste = (req, res) => {
    const { contenu, id_user, id_piste } = req.body;

    if (!id_piste || !contenu || !id_user) {
        return res.status(400).json({ error: "id_piste, contenu, and id_user cannot be null" });
    }

    const query = "INSERT INTO commentaires_pistes (contenu, id_user, id_piste) VALUES (?, ?, ?)";
    connection.query(query, [contenu, id_user, id_piste], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Commentaire ajouté avec succès", id: result.insertId });
    });
};
// Supprimer un commentaire sur une piste
exports.deleteCommentairePiste = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM commentaires_pistes WHERE id_commentaire = ?";
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

// Mettre à jour un commentaire sur une piste
exports.updateCommentairePiste = (req, res) => {
    const { contenu } = req.body;
    const { id } = req.params;
    const query = "UPDATE commentaires_pistes SET contenu = ? WHERE id_commentaire = ?";
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
