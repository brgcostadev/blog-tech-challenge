class PostRepositoryInterface {
    findAll() {
        throw new Error("Método findAll não implementado");
    }

    findById(id) {
        throw new Error("Método findById não implementado");
    }

    create(post) {
        throw new Error("Método create não implementado");
    }

    update(id, post) {
        throw new Error("Método update não implementado");
    }

    delete(id) {
        throw new Error("Método delete não implementado");
    }
}

module.exports = PostRepositoryInterface;