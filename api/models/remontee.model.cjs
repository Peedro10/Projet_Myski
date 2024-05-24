// models/remontee.model.cjs
const { connection } = require("../connect.cjs");

class Remontee {
    constructor(remontee) {
        this.nom = remontee.nom;
        this.type = remontee.type;
        this.etat = remontee.etat;
        this.difficulte = remontee.difficulte;
    }

    validate() {
        if (!this.nom || typeof this.nom !== 'string' ||
            !this.type || typeof this.type !== 'string' ||
            this.etat === undefined || ![0, 1].includes(this.etat) ||
            !this.difficulte || typeof this.difficulte !== 'string') {
            return { valid: false, message: "Invalid data provided" };
        }
        return { valid: true, message: "Remontee data is valid" };
    }

    save(callback) {
        if (!this.validate().valid) {
            return callback(this.validate().message, null);
        }

        const query = "INSERT INTO remontees (nom, type, etat, difficulte) VALUES (?, ?, ?, ?)";
        connection.query(query, [this.nom, this.type, this.etat, this.difficulte], (err, result) => {
            if (err) {
                return callback(`Database error: ${err.message}`, null);
            }
            callback(null, { id: result.insertId, ...this });
        });
    }

    static findAll(callback) {
        const query = "SELECT * FROM remontees";
        connection.query(query, (err, results) => {
            if (err) {
                return callback(`Database error: ${err.message}`, null);
            }
            callback(null, results);
        });
    }

    static findById(id, callback) {
        const query = "SELECT * FROM remontees WHERE id_remonte = ?";
        connection.query(query, [id], (err, results) => {
            if (err) {
                return callback(`Database error: ${err.message}`, null);
            }
            if (results.length > 0) {
                callback(null, results[0]);
            } else {
                callback("Remontee not found", null);
            }
        });
    }
}

module.exports = Remontee;
