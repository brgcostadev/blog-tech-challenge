const postRepository = require("../modules/posts/infrastructure/repositories/PostRepository");

const ListarPostsUseCase = require("../modules/posts/application/use-cases/ListarPostsUseCase");
const BuscarPostPorIdUseCase = require("../modules/posts/application/use-cases/BuscarPostPorIdUseCase");
const CriarPostUseCase = require("../modules/posts/application/use-cases/CriarPostUseCase");
const EditarPostUseCase = require("../modules/posts/application/use-cases/EditarPostUseCase");
const ExcluirPostUseCase = require("../modules/posts/application/use-cases/ExcluirPostUseCase");

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