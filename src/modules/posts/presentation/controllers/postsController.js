const {
    listarPostsUseCase,
    buscarPostPorIdUseCase,
    criarPostUseCase,
    editarPostUseCase,
    excluirPostUseCase
} = require("../../../../container/postsContainer");

async function listarPosts(req, res) {
    return res.json(await listarPostsUseCase.execute());
}
async function buscarPostPorId(req, res) {
    return res.json(await buscarPostPorIdUseCase.execute(Number(req.params.id)));
}
async function criarPost(req, res) {
    return res.status(201).json(await criarPostUseCase.execute(req.body));
}
async function editarPost(req, res) {
    return res.json(await editarPostUseCase.execute(Number(req.params.id), req.body));
}
async function excluirPost(req, res) {
    await excluirPostUseCase.execute(Number(req.params.id));
    return res.json({ mensagem: "Post removido com sucesso" });
}
module.exports = { listarPosts, buscarPostPorId, criarPost, editarPost, excluirPost };
