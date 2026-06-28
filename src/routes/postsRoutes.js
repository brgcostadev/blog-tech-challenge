const express = require("express");

const router = express.Router();

router.get("/posts", (req, res) => {
    res.json({
        mensagem: "Rota de Posts funcionando!"
    });
});

module.exports = router;