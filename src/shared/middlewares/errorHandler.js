const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");

function errorHandler(error, req, res, next) {
    if (res.headersSent) return next(error);

    if (error instanceof ValidationError || error instanceof NotFoundError) {
        const body = { mensagem: error.message };
        if (error.camposFaltando) body.camposFaltando = error.camposFaltando;
        return res.status(error.statusCode).json(body);
    }
    if (error.type === "entity.parse.failed" && error.status === 400) {
        return res.status(400).json({ mensagem: "Corpo JSON inválido." });
    }
    if (error.type === "entity.too.large" && error.status === 413) {
        return res.status(413).json({ mensagem: "Corpo da requisição excede o limite permitido." });
    }
    console.error("Erro capturado pelo errorHandler:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
}
module.exports = errorHandler;
