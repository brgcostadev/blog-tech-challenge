const Post = require("../../../domain/entities/Post");
const postRepository = require("../../../infrastructure/repositories/PostRepository");

class EditarPostUseCase {
    async execute(id, data) {
         const post = new Post({
            id,
            titulo: data.titulo,
            conteudo: data.conteudo,
            autor: data.autor
        });

        const postAtualizado = await postRepository.update(id, post);

        return postAtualizado;
    }
}

module.exports = new EditarPostUseCase();