function validarPost(req, res, next) {
    const { titulo, conteudo, autor } = req.body;

    const camposFaltando = [];

    if (!titulo) camposFaltando.push("titulo");
    if (!conteudo) camposFaltando.push("conteudo");
    if (!autor) camposFaltando.push("autor");

    if (camposFaltando.length > 0) {
        return res.status(400).json({
            mensagem: "Campos obrigatórios não informados.",
            camposFaltando
        });
    }

    next();
}

module.exports = validarPost;