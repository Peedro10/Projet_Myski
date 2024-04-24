const express = require("express");
const app = express();

const userRoutes = require("./routes/users.cjs");
const authRoutes = require("./routes/auth.cjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware pour autoriser les requêtes avec les credentials
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(cookieParser());

// Configuration CORS avec l'origine autorisée
app.use(cors({
    origin: "http://localhost:3000",
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
    console.log("API working!");
});
