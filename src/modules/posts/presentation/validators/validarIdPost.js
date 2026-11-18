const ValidationError = require("../../../../shared/errors/ValidationError");

function validarIdPost(req, res, next) {
    const { id } = req.params;
    if (!/^[0-9]+$/.test(id) || !Number.isInteger(Number(id)) || Number(id) < 1 || Number(id) > 2147483647) {
        throw new ValidationError("O ID deve ser um inteiro positivo entre 1 e 2147483647.");
    }
    next();
}
module.exports = validarIdPost;
