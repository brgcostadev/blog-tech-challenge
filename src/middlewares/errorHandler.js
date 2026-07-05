function errorHandler(error, req, res, next) {
    console.error("Erro capturado pelo errorHandler:", error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        mensagem: error.message || "Erro interno do servidor"
    });
}

module.exports = errorHandler;