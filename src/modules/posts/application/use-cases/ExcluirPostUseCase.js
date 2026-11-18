const NotFoundError = require("../../../../shared/errors/NotFoundError");
class ExcluirPostUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(id) {
        const post = await this.postRepository.delete(id);

        if (!post) throw new NotFoundError("Post não encontrado");
        return post;
    }
}

module.exports = ExcluirPostUseCase;