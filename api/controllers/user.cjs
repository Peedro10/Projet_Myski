const { connection } = require("../connect.cjs");

const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT id, username, name, email FROM users WHERE id = ?";
    connection.query(q, [userId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length === 0) {
            return res.status(404).json("User not found");
        }
        res.status(200).json(result[0]);
    });
};

module.exports = { getUser };
