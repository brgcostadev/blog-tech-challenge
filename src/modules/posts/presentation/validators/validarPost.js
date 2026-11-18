const ValidationError = require("../../../../shared/errors/ValidationError");

function validarPost(req, res, next) {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        throw new ValidationError("O corpo da requisição deve ser um objeto JSON.");
    }
    const camposFaltando = ["titulo", "conteudo", "autor"].filter(campo => {
        const valor = req.body[campo];
        return valor == null || (typeof valor === "string" && !valor.trim());
    });
    if (camposFaltando.length) {
        throw new ValidationError("Campos obrigatórios não informados.", camposFaltando);
    }
    next();
}
module.exports = validarPost;
