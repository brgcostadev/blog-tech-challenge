const postRepository = require("../../../infrastructure/repositories/PostRepository");

class ExcluirPostUseCase {
    async execute(id) {
        const post = await postRepository.delete(id);

        return post;
    }
}

module.exports = new ExcluirPostUseCase();