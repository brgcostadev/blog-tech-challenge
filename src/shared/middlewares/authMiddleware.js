const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (usuario.perfil !== "professor") {
      return res.status(403).json({ erro: "Acesso negado" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = authMiddleware;