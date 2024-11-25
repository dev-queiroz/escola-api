const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno no servidor." });
};

module.exports = errorMiddleware;
