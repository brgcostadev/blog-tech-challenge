const Post = require("../../../domain/entities/Post");

class CriarPostUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    
    async execute(data) {
        const post = new Post({
            titulo: data.titulo,
            conteudo: data.conteudo,
            autor: data.autor
        });

        const postCriado = await this.postRepository.create(post);

        return postCriado;
    }
}

module.exports = CriarPostUseCase;