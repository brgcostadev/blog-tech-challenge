const ValidationError = require("../../../../shared/errors/ValidationError");

class Post {
    constructor({ id, titulo, conteudo, autor } = {}) {
        const campos = { titulo, conteudo, autor };
        const limites = { titulo: 255, autor: 100 };
        this.id = id;
        for (const [campo, valor] of Object.entries(campos)) {
            if (typeof valor !== "string") {
                throw new ValidationError(`O campo ${campo} deve ser uma string.`);
            }
            const normalizado = valor.trim();
            if (!normalizado) {
                throw new ValidationError(`O campo ${campo} é obrigatório.`);
            }
            // PostgreSQL conta caracteres Unicode, não unidades UTF-16.
            if (limites[campo] && [...normalizado].length > limites[campo]) {
                throw new ValidationError(`O campo ${campo} deve ter no máximo ${limites[campo]} caracteres.`);
            }
            this[campo] = normalizado;
        }
    }
}
module.exports = Post;
