const { connection } = require("../connect.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";
    connection.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

        connection.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};

exports.login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    connection.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");
  
      const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
      if (!checkPassword) return res.status(400).json("Wrong password or username!");
  
      const token = jwt.sign({ id: data[0].id, username: data[0].username }, process.env.JWT_SECRET);
      
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: 'strict'
      }).status(200).json({ user: { id: data[0].id, username: data[0].username } });
    });
};

exports.logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out");
};

exports.checkAuth = (req, res) => {
  const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ user: decoded });
  } catch (err) {
      res.status(401).json({ message: "Invalid token" });
  }
};
