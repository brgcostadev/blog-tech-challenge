const express = require("express");

const postsController = require("../controllers/postsController");

const router = express.Router();

router.get("/posts", postsController.listarPosts);
router.get("/posts/:id", postsController.buscarPostPorId);
router.post("/posts", postsController.criarPost);
router.put("/posts/:id", postsController.editarPost);
router.delete("/posts/:id", postsController.excluirPost);
router.get("/test-db", async (req, res) => {
    const pool = require("../database/connection");

    const resultado = await pool.query("SELECT NOW()");

    res.json(resultado.rows[0]);
});

module.exports = router;