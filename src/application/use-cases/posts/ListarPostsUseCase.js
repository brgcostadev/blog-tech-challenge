class ListarPostsUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute() {
        const posts = await this.postRepository.findAll();

        return posts;
    }
}

module.exports = ListarPostsUseCase;