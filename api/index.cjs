const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config(); // Pour charger les variables d'environnement depuis un fichier .env

const app = express();

// Importation des routeurs
const userRoutes = require("./routes/users.cjs");
const authRoutes = require("./routes/auth.cjs");
const pisteRoutes = require("./routes/pistes.cjs");
const remonteeRoutes = require("./routes/remontees.cjs");
const commentairePistesRoutes = require("./routes/commentaires_pistes.cjs");
const commentaireRemonteesRoutes = require("./routes/commentaires_remontees.cjs");
const itineraireRoutes = require("./routes/itineraires.cjs");
const chatRoutes = require("./routes/chats.cjs");

// Importation des middlewares
const { verifyToken } = require("./middleware/authMiddleware.cjs");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware.cjs");

// Middleware pour parser le JSON entrant et les cookies
app.use(express.json());
app.use(cookieParser());

// Configuration CORS pour autoriser les requêtes de l'origine spécifiée
app.use(cors({
    origin: "http://localhost:3000",  // Assurez-vous que cette origine correspond à celle de votre client front-end
    credentials: true  // Permet de gérer les credentials comme les cookies, les autorisations, et les certificats client SSL
}));

// Routes pour les différentes parties de l'API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pistes", pisteRoutes);
app.use("/api/remontees", remonteeRoutes);
app.use("/api/commentaires/pistes", commentairePistesRoutes);
app.use("/api/commentaires/remontees", commentaireRemonteesRoutes);
app.use("/api/itineraires", itineraireRoutes);
app.use("/api/chats", chatRoutes);

// Utilisation du middleware d'authentification avant certaines routes si nécessaire
app.use('/api/private', verifyToken, (req, res) => {
    res.send("This is a private route");
});

// Middleware de gestion des erreurs (doit être ajouté après toutes les routes)
app.use(errorHandlingMiddleware);

// Démarrage du serveur sur le port spécifié
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
