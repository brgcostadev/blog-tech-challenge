const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../../../../infrastructure/database/connection");

const router = express.Router();

// Listar professores com paginação
router.get("/professores", async (req, res) => {
  const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
  const limite = 10;

  const resultado = await pool.query(
    "SELECT id, nome, email FROM professores ORDER BY id LIMIT $1 OFFSET $2",
    [limite, (pagina - 1) * limite]
  );

  res.json(resultado.rows);
});

// Buscar professor
router.get("/professores/:id", async (req, res) => {
  const resultado = await pool.query(
    "SELECT id, nome, email FROM professores WHERE id = $1",
    [req.params.id]
  );

  if (!resultado.rowCount) {
    return res.status(404).json({ erro: "Professor não encontrado" });
  }

  res.json(resultado.rows[0]);
});

// Cadastrar professor
router.post("/professores", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || typeof senha !== "string" || senha.length < 8) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const hash = await bcrypt.hash(senha, 10);

  const resultado = await pool.query(
    "INSERT INTO professores (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
    [nome, email, hash]
  );

  res.status(201).json(resultado.rows[0]);
});

// Editar professor
router.put("/professores/:id", async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const resultado = await pool.query(
    "UPDATE professores SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email",
    [nome, email, req.params.id]
  );

  if (!resultado.rowCount) {
    return res.status(404).json({ erro: "Professor não encontrado" });
  }

  res.json(resultado.rows[0]);
});

// Excluir professor
router.delete("/professores/:id", async (req, res) => {
  const resultado = await pool.query(
    "DELETE FROM professores WHERE id = $1",
    [req.params.id]
  );

  if (!resultado.rowCount) {
    return res.status(404).json({ erro: "Professor não encontrado" });
  }

  res.status(204).send();
});

module.exports = router;