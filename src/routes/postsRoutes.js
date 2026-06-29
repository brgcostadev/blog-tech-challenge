const express = require("express");

const postsController = require("../controllers/postsController");

const router = express.Router();

router.get("/posts", postsController.listarPosts);
router.get("/posts/:id", postsController.buscarPostPorId);
router.post("/posts", postsController.criarPost);

module.exports = router;