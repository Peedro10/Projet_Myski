const { connection } = require("../connect.cjs");

class User {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password; // Assurez-vous que le mot de passe est déjà haché avant de créer une instance
        this.name = user.name;
    }

    // Valider les données de l'utilisateur
    validate() {
        if (!this.username || !this.email || !this.password || !this.name) {
            return { valid: false, message: "All fields must be provided and non-empty." };
        }
        // Ajouter d'autres validations selon les besoins, comme vérifier le format de l'email, la longueur du mot de passe, etc.
        return { valid: true, message: "User data is valid." };
    }

    // Enregistrer le nouvel utilisateur dans la base de données
    save(callback) {
        const query = "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
        connection.query(query, [this.username, this.email, this.password, this.name], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: result.insertId, ...this });
            }
        });
    }

    // Méthode statique pour récupérer tous les utilisateurs
    static findAll(callback) {
        const query = "SELECT id, username, email, name FROM users"; // Ne pas retourner les mots de passe
        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Méthode statique pour récupérer un utilisateur par son ID
    static findById(id, callback) {
        const query = "SELECT id, username, email, name FROM users WHERE id = ?";
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

module.exports = User;
