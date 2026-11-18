require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("../src/infrastructure/database/connection");

async function criarAdmin() {
  try {
    const senha = await bcrypt.hash("Professor123", 10);

    await pool.query(
      `INSERT INTO professores (nome, email, senha)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING`,
      ["Professor Admin", "admin@fiap.com.br", senha]
    );

    console.log("Administrador configurado com sucesso!");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

criarAdmin();