const express = require("express");
const postsRoutes = require("./modules/posts/presentation/routes/postsRoutes");
const professoresRoutes = require("./modules/professores/presentation/routes/professoresRoutes");
const alunosRoutes = require("./modules/alunos/presentation/routes/alunosRoutes");
const authRoutes = require("./modules/auth/presentation/routes/authRoutes");
const authMiddleware = require("./shared/middlewares/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("./shared/middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Autenticação
app.use("/", authRoutes);

// Proteger alterações nas postagens
app.use("/posts", (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }

  return authMiddleware(req, res, next);
});

// Rotas de postagens
app.use("/", postsRoutes);

// Rotas administrativas protegidas
app.use("/professores", authMiddleware);
app.use("/alunos", authMiddleware);

app.use("/", professoresRoutes);
app.use("/", alunosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});