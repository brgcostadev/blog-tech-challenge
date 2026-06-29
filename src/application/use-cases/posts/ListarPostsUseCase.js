const postRepository = require("../../../infrastructure/repositories/PostRepository");

class ListarPostsUseCase {
    async execute() {
        const posts = await postRepository.findAll();

        return posts;
    }
}

module.exports = new ListarPostsUseCase();