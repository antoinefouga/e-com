const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  // Définir le code de statut et le message d'erreur par défaut
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Erreur interne du serveur";

  // Environnement de développement
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }

  // Environnement de production
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Gestion des erreurs CastError (ID MongoDB invalide)
    if (err.name === "CastError") {
      error = new ErrorHandler(
        `Produit non trouvé. ID invalide: ${err.value}`,
        400
      );
    }

    // Gestion des erreurs de validation (ValidationError de Mongoose)
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((value) => value.message)
        .join(", ");
      error = new ErrorHandler(message, 400);
    }

    // Gestion des erreurs d'authentification JWT expiré
    if (err.name === "TokenExpiredError") {
      error = new ErrorHandler(
        "Votre jeton a expiré. Veuillez vous reconnecter.",
        401
      );
    }

    // Gestion des erreurs d'authentification JWT invalide
    if (err.name === "JsonWebTokenError") {
      error = new ErrorHandler(
        "Jeton invalide. Veuillez vous reconnecter.",
        401
      );
    }

    // Retourner la réponse d'erreur en production
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Erreur interne du serveur",
    });
  }
};
