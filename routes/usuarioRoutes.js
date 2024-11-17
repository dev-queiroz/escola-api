const express = require("express");
const {
  loginUsuario,
  registrarUsuario,
} = require("../controllers/usuarioController");
const router = express.Router();

// Rotas de Usuários
router.post("/login", loginUsuario); // Rota de login não requer autenticação
router.post("/registro", registrarUsuario);

module.exports = router;
