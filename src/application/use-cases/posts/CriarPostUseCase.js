const Post = require("../../../domain/entities/Post");
const postRepository = require("../../../infrastructure/repositories/PostRepository");

class CriarPostUseCase {
    async execute(data) {
        const post = new Post({
            titulo: data.titulo,
            conteudo: data.conteudo,
            autor: data.autor
        });

        const postCriado = await postRepository.create(post);

        return postCriado;
    }
}

module.exports = new CriarPostUseCase();