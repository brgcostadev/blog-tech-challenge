function validarPost(req, res, next) {
    const { titulo, conteudo, autor } = req.body;

    if (!titulo || !conteudo || !autor) {
        return res.status(400).json({
            mensagem: "Título, conteúdo e autor são obrigatórios."
        });
    }

    next();
}

module.exports = validarPost;