const postRepository = require("../../../infrastructure/repositories/PostRepository");

class EditarPostUseCase {
    async execute(id, data) {
        const post = await postRepository.update(id, data);

        return post;
    }
}

module.exports = new EditarPostUseCase();