const { connection } = require("../connect.cjs");

class CommentairePiste {
    constructor(commentaire) {
        this.id_commentaire = commentaire.id_commentaire;
        this.contenu = commentaire.contenu;
        this.id_user = commentaire.id_user;
        this.id_piste = commentaire.id_piste;
    }

    save(callback) {
        const query = "INSERT INTO commentaires_pistes (contenu, id_user, id_piste) VALUES (?, ?, ?)";
        connection.query(query, [this.contenu, this.id_user, this.id_piste], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, { id_commentaire: result.insertId, ...this });
        });
    }

    static findById(id, callback) {
        const query = "SELECT * FROM commentaires_pistes WHERE id_commentaire = ?";
        connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length > 0) {
                callback(null, new CommentairePiste(results[0]));
                return;
            }
            callback(null, null);
        });
    }

    static deleteById(id, callback) {
        const query = "DELETE FROM commentaires_pistes WHERE id_commentaire = ?";
        connection.query(query, [id], (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, { message: "Commentaire deleted successfully", affectedRows: result.affectedRows });
        });
    }

    static updateById(id, contenu, callback) {
        const query = "UPDATE commentaires_pistes SET contenu = ? WHERE id_commentaire = ?";
        connection.query(query, [contenu, id], (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, { message: "Commentaire updated successfully", affectedRows: result.affectedRows });
        });
    }
}

module.exports = CommentairePiste;
