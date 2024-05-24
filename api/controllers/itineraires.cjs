const { connection } = require("../connect.cjs");

// Récupérer tous les itinéraires
exports.getItineraires = (req, res) => {
    const query = `
        SELECT 
            it.id_itineraire,
            p_start.nom AS piste_start,
            p_end.nom AS piste_end,
            it.description
        FROM 
            itineraires it
        JOIN 
            pistes p_start ON it.id_piste_start = p_start.id_piste
        JOIN 
            pistes p_end ON it.id_piste_end = p_end.id_piste
    `;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Ajouter un itinéraire
exports.addItineraire = (req, res) => {
    const { id_piste_start, id_piste_end, description } = req.body;

    if (!id_piste_start || !id_piste_end || !description) {
        return res.status(400).json({ error: "id_piste_start, id_piste_end, and description cannot be null" });
    }

    const query = "INSERT INTO itineraires (id_piste_start, id_piste_end, description) VALUES (?, ?, ?)";
    connection.query(query, [id_piste_start, id_piste_end, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Itinéraire ajouté avec succès", id: result.insertId });
    });
};

// Supprimer un itinéraire
exports.deleteItineraire = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM itineraires WHERE id_itineraire = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Itinéraire non trouvé" });
        }
        res.status(200).json({ message: "Itinéraire supprimé avec succès" });
    });
};
