const express = require("express");

const postsRoutes = require("./routes/postsRoutes");

const app = express();

app.use(express.json());


app.use("/", postsRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});