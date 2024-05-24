// models/piste.model.cjs
const { connection } = require("../connect.cjs");

class Piste {
    constructor(piste) {
        this.id = piste.id;
        this.nom = piste.nom;
        this.couleur = piste.couleur;
        this.etat = piste.etat;
        this.canon_a_neige = piste.canon_a_neige;
    }

    // Ajout de la méthode de mise à jour
    update(callback) {
        const query = "UPDATE pistes SET nom = ?, couleur = ?, etat = ?, canon_a_neige = ? WHERE id_piste = ?";
        connection.query(query, [this.nom, this.couleur, this.etat, this.canon_a_neige, this.id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: this.id, ...this });
            }
        });
    }

    // Les autres méthodes restent inchangées
}


    // Valider les données de la piste
    validate() {
        if (!this.nom || !this.couleur || this.etat === undefined || this.canon_a_neige === undefined) {
            return { valid: false, message: "All fields must be filled" };
        }
        return { valid: true, message: "Piste data is valid" };
    }

    // Enregistrer la nouvelle piste dans la base de données
    save(callback) {
        const query = "INSERT INTO pistes (nom, couleur, etat, canon_a_neige) VALUES (?, ?, ?, ?)";
        connection.query(query, [this.nom, this.couleur, this.etat, this.canon_a_neige], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: result.insertId, ...this });
            }
        });
    }

    // Méthode statique pour récupérer toutes les pistes
    static findAll(callback) {
        const query = "SELECT * FROM pistes";
        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Méthode statique pour récupérer une piste par son ID
    static findById(id, callback) {
        const query = "SELECT * FROM pistes WHERE id_piste = ?";
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                if (results.length > 0) {
                    callback(null, results[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }
}

module.exports = Piste;
