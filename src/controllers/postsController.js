const pool = require("../database/connection");

async function listarPosts(req, res) {

    const resultado = await pool.query(
        "SELECT * FROM posts"
    );

    res.json(resultado.rows);
}

async function buscarPostPorId(req, res) {
    const id = Number(req.params.id);

    const resultado = await pool.query(
        "SELECT * FROM posts WHERE id = $1",
        [id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            mensagem: "Post não encontrado"
        });
    }

    res.json(resultado.rows[0]);
}

async function criarPost(req, res) {
    const { titulo, conteudo, autor } = req.body;

    const resultado = await pool.query(
        "INSERT INTO posts (titulo, conteudo, autor) VALUES ($1, $2, $3) RETURNING *",
        [titulo, conteudo, autor]
    );

    res.status(201).json(resultado.rows[0]);
}

async function editarPost(req, res) {

    const id = Number(req.params.id);

    const { titulo, conteudo, autor } = req.body;

    const resultado = await pool.query(
        `UPDATE posts
         SET titulo = $1,
             conteudo = $2,
             autor = $3
         WHERE id = $4
         RETURNING *`,
        [titulo, conteudo, autor, id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            mensagem: "Post não encontrado"
        });
    }

    res.json(resultado.rows[0]);

}

async function excluirPost(req, res) {

    const id = Number(req.params.id);

    const resultado = await pool.query(
        `DELETE FROM posts
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    if (resultado.rows.length === 0) {
        return res.status(404).json({
            mensagem: "Post não encontrado"
        });
    }

    res.json({
        mensagem: "Post removido com sucesso"
    });
}

module.exports = {
    listarPosts,
    buscarPostPorId,
    criarPost,
    editarPost,
    excluirPost
};