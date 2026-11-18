const express = require("express");
const pool = require("../../../../infrastructure/database/connection");

const router = express.Router();

// Listar alunos com paginação
router.get("/alunos", async (req, res) => {
  const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
  const limite = 10;

  const resultado = await pool.query(
    "SELECT id, nome, email FROM alunos ORDER BY id LIMIT $1 OFFSET $2",
    [limite, (pagina - 1) * limite]
  );

  res.json(resultado.rows);
});

// Buscar aluno
router.get("/alunos/:id", async (req, res) => {
  const resultado = await pool.query(
    "SELECT id, nome, email FROM alunos WHERE id = $1",
    [req.params.id]
  );

  if (!resultado.rowCount) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  res.json(resultado.rows[0]);
});

// Cadastrar aluno
router.post("/alunos", async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const resultado = await pool.query(
    "INSERT INTO alunos (nome, email) VALUES ($1, $2) RETURNING id, nome, email",
    [nome, email]
  );

  res.status(201).json(resultado.rows[0]);
});

// Editar aluno
router.put("/alunos/:id", async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const resultado = await pool.query(
    "UPDATE alunos SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email",
    [nome, email, req.params.id]
  );

  if (!resultado.rowCount) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  res.json(resultado.rows[0]);
});

// Excluir aluno
router.delete("/alunos/:id", async (req, res) => {
  const resultado = await pool.query(
    "DELETE FROM alunos WHERE id = $1",
    [req.params.id]
  );

  if (!resultado.rowCount) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  res.status(204).send();
});

module.exports = router;