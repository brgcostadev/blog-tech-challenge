const Post = require("../../../domain/entities/Post");

class EditarPostUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(id, data) {
         const post = new Post({
            id,
            titulo: data.titulo,
            conteudo: data.conteudo,
            autor: data.autor
        });

        const postAtualizado = await this.postRepository.update(id, post);

        return postAtualizado;
    }
}

module.exports = EditarPostUseCase;