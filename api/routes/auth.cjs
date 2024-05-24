const express = require("express");
const { register, login, logout, checkAuth } = require("../controllers/auth.cjs");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth", checkAuth);  // Ajout de la route pour vérifier l'authentification

module.exports = router;
