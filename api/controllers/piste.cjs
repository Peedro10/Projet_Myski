// controllers/piste.cjs
const { connection } = require("../connect.cjs");

// Récupérer toutes les pistes
exports.getPistes = (req, res) => {
    const query = "SELECT * FROM pistes";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Récupérer une piste spécifique par ID
exports.getPisteById = (req, res) => {
    const pisteId = req.params.id;
    const query = "SELECT * FROM pistes WHERE id_piste = ?";
    connection.query(query, [pisteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Piste not found" });
        }
        res.status(200).json(results[0]);
    });
};

// Mettre à jour l'état d'une piste
// Mettre à jour l'état d'une piste
exports.updatePiste = (req, res) => {
    const etat = parseInt(req.body.etat); // Assurez-vous que l'état est un entier
    const pisteId = req.params.id;

    if (![0, 1].includes(etat)) {
        return res.status(400).json({ message: "Invalid state value" });
    }

    const query = "UPDATE pistes SET etat = ? WHERE id_piste = ?";
    connection.query(query, [etat, pisteId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Piste not found" });
        }
        res.status(200).json({ message: "Piste updated successfully" });
    });
};


// Ajouter une nouvelle piste
exports.addPiste = (req, res) => {
    const { nom, couleur, etat, canon_a_neige } = req.body;
    const query = "INSERT INTO pistes (nom, couleur, etat, canon_a_neige) VALUES (?, ?, ?, ?)";
    connection.query(query, [nom, couleur, etat, canon_a_neige], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Piste added successfully", id: result.insertId });
    });
};

