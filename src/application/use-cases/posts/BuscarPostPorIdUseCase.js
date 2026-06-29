const postRepository = require("../../../infrastructure/repositories/PostRepository");

class BuscarPostPorIdUseCase {
    async execute(id) {
        const post = await postRepository.findById(id);

        return post;
    }
}

module.exports = new BuscarPostPorIdUseCase();