const express = require("express");
const { adicionarNota, listarNotas } = require("../controllers/notaController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Rotas de Notas
router.post("/", authMiddleware, adicionarNota); // Apenas professores podem adicionar notas
router.get("/:aluno_id", authMiddleware, listarNotas); // Listar notas de um aluno

module.exports = router;
