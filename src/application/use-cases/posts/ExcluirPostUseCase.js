class ExcluirPostUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(id) {
        const post = await this.postRepository.delete(id);

        return post;
    }
}

module.exports = ExcluirPostUseCase;