// controllers/remontee.cjs
const { connection } = require("../connect.cjs");

// Récupérer toutes les remontées
exports.getRemontees = (req, res) => {
    const query = "SELECT * FROM remontees";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Récupérer une remontée spécifique par ID
exports.getRemonteeById = (req, res) => {
    const remonteeId = req.params.id;
    const query = "SELECT * FROM remontees WHERE id_remonte = ?";
    connection.query(query, [remonteeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Remontée not found" });
        }
        res.status(200).json(results[0]);
    });
};

// Mettre à jour une remontée
exports.updateRemontee = (req, res) => {
    const { etat } = req.body; // L'état de la remontée, 0 pour fermée, 1 pour ouverte
    const remonteeId = req.params.id;

    const query = "UPDATE remontees SET etat = ? WHERE id_remonte = ?";
    connection.query(query, [etat, remonteeId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Remontée not found" });
        }
        res.status(200).json({ message: "Remontée updated successfully" });
    });
};

// Ajouter une nouvelle remontée
exports.addRemontee = (req, res) => {
    const { nom, type, etat, difficulte } = req.body;
    const query = "INSERT INTO remontees (nom, type, etat, difficulte) VALUES (?, ?, ?, ?)";
    connection.query(query, [nom, type, etat, difficulte], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Remontée added successfully", id: result.insertId });
    });
};
exports.getRemontees = (req, res) => {
    const query = `
        SELECT r.id_remonte, r.nom AS remontee_nom, r.type, r.etat, r.difficulte, 
               p.id_piste, p.nom AS piste_nom
        FROM remontees r
        LEFT JOIN pistes p ON r.id_remonte = p.id_remonte
    `;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const remontees = results.reduce((acc, row) => {
            const { id_remonte, remontee_nom, type, etat, difficulte, id_piste, piste_nom } = row;
            if (!acc[id_remonte]) {
                acc[id_remonte] = {
                    id_remonte,
                    nom: remontee_nom,
                    type,
                    etat,
                    difficulte,
                    pistes: []
                };
            }
            if (id_piste) {
                acc[id_remonte].pistes.push({ id_piste, nom: piste_nom });
            }
            return acc;
        }, {});

        res.status(200).json(Object.values(remontees));
    });
};

// Récupérer une remontée spécifique par ID avec les pistes desservies
exports.getRemonteeById = (req, res) => {
    const remonteeId = req.params.id;
    const query = `
        SELECT r.id_remonte, r.nom AS remontee_nom, r.type, r.etat, r.difficulte,
               p.id_piste, p.nom AS piste_nom
        FROM remontees r
        LEFT JOIN pistes p ON r.id_remonte = p.id_remonte
        WHERE r.id_remonte = ?
    `;
    connection.query(query, [remonteeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Remontée not found" });
        }

        const remontee = {
            id_remonte: results[0].id_remonte,
            nom: results[0].remontee_nom,
            type: results[0].type,
            etat: results[0].etat,
            difficulte: results[0].difficulte,
            pistes: results.filter(result => result.id_piste !== null).map(result => ({
                id_piste: result.id_piste,
                nom: result.piste_nom
            }))
        };

        res.status(200).json(remontee);
    });
};
