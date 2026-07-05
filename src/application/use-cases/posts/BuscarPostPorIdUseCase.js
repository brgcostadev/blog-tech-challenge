const NotFoundError = require("../../../shared/errors/NotFoundError");

class BuscarPostPorIdUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(id) {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new NotFoundError("Post não encontrado");
        }
        
        return post;
    }
}

module.exports = BuscarPostPorIdUseCase;