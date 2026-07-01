class BuscarPostPorIdUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(id) {
        const post = await this.postRepository.findById(id);

        return post;
    }
}

module.exports = BuscarPostPorIdUseCase;