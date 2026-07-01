const postRepository = require("../infrastructure/repositories/PostRepository");

const ListarPostsUseCase = require("../application/use-cases/posts/ListarPostsUseCase");
const BuscarPostPorIdUseCase = require("../application/use-cases/posts/BuscarPostPorIdUseCase");
const CriarPostUseCase = require("../application/use-cases/posts/CriarPostUseCase");
const EditarPostUseCase = require("../application/use-cases/posts/EditarPostUseCase");
const ExcluirPostUseCase = require("../application/use-cases/posts/ExcluirPostUseCase");

const listarPostsUseCase = new ListarPostsUseCase(postRepository);
const buscarPostPorIdUseCase = new BuscarPostPorIdUseCase(postRepository);
const criarPostUseCase = new CriarPostUseCase(postRepository);
const editarPostUseCase = new EditarPostUseCase(postRepository);
const excluirPostUseCase = new ExcluirPostUseCase(postRepository);

module.exports = {
    listarPostsUseCase,
    buscarPostPorIdUseCase,
    criarPostUseCase,
    editarPostUseCase,
    excluirPostUseCase
};