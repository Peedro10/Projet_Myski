// middleware/errorHandlingMiddleware.cjs
const errorHandlingMiddleware = (err, req, res, next) => {
    // Définition du statut HTTP à renvoyer. Utilise le statut de l'erreur si disponible, sinon 500.
    const status = err.status || 500;
    // Message d'erreur à renvoyer. Utilise le message de l'erreur si disponible, sinon un message générique.
    const message = err.message || "Something went wrong on the server.";

    console.error(`[Error] ${status} - ${message} :: ${new Date()}`);

    // Renvoie la réponse avec le statut et le message d'erreur.
    res.status(status).json({
        error: true,
        status: status,
        message: message
    });
};

module.exports = errorHandlingMiddleware;
