const express = require("express");
const postsRoutes = require("./routes/postsRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", postsRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});