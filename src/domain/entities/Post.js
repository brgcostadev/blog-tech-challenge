class Post {
    constructor({ id, titulo, conteudo, autor }) {
        if (!titulo || !conteudo || !autor) {
            throw new Error("Título, conteúdo e autor são obrigatórios.");
        }

        this.id = id;
        this.titulo = titulo.trim();
        this.conteudo = conteudo.trim();
        this.autor = autor.trim();
    }
}

module.exports = Post;