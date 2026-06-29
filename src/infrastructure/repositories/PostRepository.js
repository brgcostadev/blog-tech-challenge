const pool = require("../../database/connection");

class PostRepository {
    async findAll() {
        const resultado = await pool.query(
            "SELECT * FROM posts ORDER BY id ASC"
        );

        return resultado.rows;
    }

    async findById(id) {
        const resultado = await pool.query(
            "SELECT * FROM posts WHERE id = $1",
            [id]
        );

        return resultado.rows[0];
    }

    async create(data) {
        const { titulo, conteudo, autor } = data;

        const resultado = await pool.query(
            "INSERT INTO posts (titulo, conteudo, autor) VALUES ($1, $2, $3) RETURNING *",
            [titulo, conteudo, autor]
        );

        return resultado.rows[0];
    }

    async update(id, data) {
        const { titulo, conteudo, autor } = data;

        const resultado = await pool.query(
            `UPDATE posts
             SET titulo = $1,
                 conteudo = $2,
                 autor = $3
             WHERE id = $4
             RETURNING *`,
            [titulo, conteudo, autor, id]
        );

        return resultado.rows[0];
    }

    async delete(id) {
        const resultado = await pool.query(
            "DELETE FROM posts WHERE id = $1 RETURNING *",
            [id]
        );

        return resultado.rows[0];
    }
}

module.exports = new PostRepository();