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

function editarPost(req, res) {
    const id = Number(req.params.id);

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            mensagem: "Post não encontrado"
        });
    }

    post.titulo = req.body.titulo;
    post.conteudo = req.body.conteudo;
    post.autor = req.body.autor;

    res.json(post);
}

function excluirPost(req, res) {

    const id = Number(req.params.id);

    const indice = posts.findIndex((post) => post.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Post não encontrado"
        });
    }

    posts.splice(indice, 1);

    res.json({
        mensagem: "Post removido com sucesso"
    });
}

module.exports = {
    listarPosts,
    buscarPostPorId,
    criarPost,
    editarPost,
    excluirPost
};