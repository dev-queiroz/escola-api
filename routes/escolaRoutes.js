const express = require("express");
const {
  criarEscola,
  listarEscolas,
} = require("../controllers/escolaController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Rotas de Escola
router.post("/", authMiddleware, criarEscola); // Apenas usuários autenticados podem criar escolas
router.get("/", authMiddleware, listarEscolas); // Listar todas as escolas (diretores, coordenadores)

module.exports = router;
