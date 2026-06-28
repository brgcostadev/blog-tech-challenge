function listarPosts(req, res) {
    res.json({
        mensagem: "Lista de posts funcionando!"
    });
}

module.exports = {
    listarPosts
};