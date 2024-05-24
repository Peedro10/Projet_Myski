const { connection } = require("../connect.cjs");

const path = require('path');
const fs = require('fs');

// Récupérer tous les messages de chat
exports.getChats = (req, res) => {
    const query = 'SELECT chats.*, users.username FROM chats JOIN users ON chats.id_user = users.id ORDER BY timestamp';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Ajouter un message de chat
exports.addChat = (req, res) => {
    const { id_user, message } = req.body;
    let audio = null;

    if (req.file) {
        audio = req.file.filename;
    }

    if (!id_user || (!message && !audio)) {
        return res.status(400).json({ error: "id_user, et message ou audio ne peuvent pas être nuls" });
    }

    const query = "INSERT INTO chats (id_user, message, audio) VALUES (?, ?, ?)";
    connection.query(query, [id_user, message, audio], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        connection.query("SELECT username FROM users WHERE id = ?", [id_user], (err, userResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const username = userResult[0].username;
            res.status(201).json({ id_chat: result.insertId, id_user, message, audio, timestamp: new Date(), username });
        });
    });
};


exports.deleteChat = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM chats WHERE id_chat = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Message non trouvé" });
        }
        res.status(200).json({ message: "Message supprimé avec succès" });
    });
};

exports.updateChat = (req, res) => {
    const { message } = req.body;
    const { id } = req.params;
    const query = "UPDATE chats SET message = ? WHERE id_chat = ?";
    connection.query(query, [message, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Message non trouvé" });
        }
        res.status(200).json({ message: "Message mis à jour avec succès" });
    });
};
