const express = require("express");
const postsController = require("../controllers/postsController");
const validarPost = require("../validators/validarPost");
const validarIdPost = require("../validators/validarIdPost");
const router = express.Router();
router.param("id", validarIdPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/posts", postsController.listarPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 2147483647
 *         description: ID inteiro positivo do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: ID inválido ou dados inválidos
 *       404:
 *         description: Post não encontrado
 */
router.get("/posts/:id", postsController.buscarPostPorId);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoPost'
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Corpo ou campos inválidos
 */
router.post("/posts", validarPost, postsController.criarPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 2147483647
 *         description: ID inteiro positivo do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoPost'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: ID, corpo ou campos inválidos
 *       404:
 *         description: Post não encontrado
 */
router.put("/posts/:id", validarPost, postsController.editarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 2147483647
 *         description: ID inteiro positivo do post
 *     responses:
 *       200:
 *         description: Post removido com sucesso
 *       400:
 *         description: ID inválido ou dados inválidos
 *       404:
 *         description: Post não encontrado
 */
router.delete("/posts/:id", postsController.excluirPost);
router.get("/test-db", async (req, res) => {
    const pool = require("../../../../infrastructure/database/connection");

    const resultado = await pool.query("SELECT NOW()");

    res.json(resultado.rows[0]);
});

module.exports = router;