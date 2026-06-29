const pool = require("../database/connection");

async function listarPosts(req, res) {
    try {

        const resultado = await pool.query(
            "SELECT * FROM posts"
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error("Erro ao listar posts:", error);
        res.status(500).json({ mensagem: "Erro ao listar posts" });
    }
}

async function buscarPostPorId(req, res) {
    try {
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
    } catch (error) {
        console.error("Erro ao buscar post por ID:", error);
        res.status(500).json({ mensagem: "Erro ao buscar post por ID" });
    }
}

async function criarPost(req, res) {
    try {
        const { titulo, conteudo, autor } = req.body;

        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({
                mensagem: "Título, conteúdo e autor são obrigatórios."
            });
        }

        const resultado = await pool.query(
            "INSERT INTO posts (titulo, conteudo, autor) VALUES ($1, $2, $3) RETURNING *",
            [titulo, conteudo, autor]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).json({ mensagem: "Erro ao criar post" });
    }
}

async function editarPost(req, res) {

    try {
        const id = Number(req.params.id);
        const { titulo, conteudo, autor } = req.body;

        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({
                mensagem: "Título, conteúdo e autor são obrigatórios."
            });
        }

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
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.status(500).json({ mensagem: "Erro ao editar post" });
    }
}

async function excluirPost(req, res) {

    try {
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
    } catch (error) {
        console.error("Erro ao excluir post:", error);
        res.status(500).json({ mensagem: "Erro ao excluir post" });
    }
}

module.exports = {
    listarPosts,
    buscarPostPorId,
    criarPost,
    editarPost,
    excluirPost
};