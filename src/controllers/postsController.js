const posts = require("../database/postsDatabase");

function listarPosts(req, res) {
    res.json(posts);
}

function buscarPostPorId(req, res) {
    const id = Number(req.params.id);

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            mensagem: "Post não encontrado"
        });
    }

    res.json(post);
}

function criarPost(req, res) {

    const novoPost = {
        id: posts.length + 1,
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        autor: req.body.autor
    };

    posts.push(novoPost);

    res.status(201).json(novoPost);
}

module.exports = {
    listarPosts,
    buscarPostPorId,
    criarPost
};