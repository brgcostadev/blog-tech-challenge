const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../../../../infrastructure/database/connection");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (typeof email !== "string" || typeof senha !== "string") {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const resultado = await pool.query(
    "SELECT * FROM professores WHERE email = $1",
    [email]
  );

  const professor = resultado.rows[0];

  if (!professor || !(await bcrypt.compare(senha, professor.senha))) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    {
      id: professor.id,
      perfil: "professor",
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h", algorithm: "HS256" }
  );

  res.json({
    token,
    professor: {
      id: professor.id,
      nome: professor.nome,
      email: professor.email,
    },
  });
});

module.exports = router;