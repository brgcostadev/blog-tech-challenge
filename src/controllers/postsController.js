const postRepository = require("../infrastructure/repositories/PostRepository");
const listarPostsUseCase = require("../application/use-cases/posts/ListarPostsUseCase");
const buscarPostPorIdUseCase = require("../application/use-cases/posts/BuscarPostPorIdUseCase");
const criarPostUseCase = require("../application/use-cases/posts/CriarPostUseCase");
const editarPostUseCase = require("../application/use-cases/posts/EditarPostUseCase");
const excluirPostUseCase = require("../application/use-cases/posts/ExcluirPostUseCase");

async function listarPosts(req, res) {
    try {
        const posts = await listarPostsUseCase.execute();

        return res.json(posts);
    } catch (error) {
        console.error("Erro ao listar posts:", error);

        return res.status(500).json({
            mensagem: "Erro ao listar posts"
        });
    }
}

async function buscarPostPorId(req, res) {
    try {
        const id = Number(req.params.id);
        const post = await buscarPostPorIdUseCase.execute(id);

        if (!post) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        res.json(post);
    } catch (error) {
        console.error("Erro ao buscar post por ID:", error);
        res.status(500).json({ mensagem: "Erro ao buscar post por ID" });
    }
}

async function criarPost(req, res) {
    try {
        const post = await criarPostUseCase.execute(req.body);

        res.status(201).json(post);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).json({ mensagem: "Erro ao criar post" });
    }
}

async function editarPost(req, res) {

    try {
        const id = Number(req.params.id);
        const post = await editarPostUseCase.execute(id, req.body);

        if (!post) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        res.json(post);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.status(500).json({ mensagem: "Erro ao editar post" });
    }
}

async function excluirPost(req, res) {
    try {
        const id = Number(req.params.id);
        const post = await excluirPostUseCase.execute(id);

        if (!post) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        res.json({
            mensagem: "Post removido com sucesso"
        });
    } catch (error) {
        console.error("Erro ao excluir post:", error);
        res.status(500).json({ mensagem: "Erro ao excluir post" });
    }
}


module.exports = {
    listarPosts,
    buscarPostPorId,
    criarPost,
    editarPost,
    excluirPost
};