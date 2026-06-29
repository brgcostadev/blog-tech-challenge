const postRepository = require("../../../infrastructure/repositories/PostRepository");

class CriarPostUseCase {
    async execute(data) {
        const post = await postRepository.create(data);

        return post;
    }
}

module.exports = new CriarPostUseCase();