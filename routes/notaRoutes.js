const express = require("express");
const {
  adicionarNota,
  listarNotas,
  atualizarNota,
  deletarNota,
} = require("../controllers/notaController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, adicionarNota);
router.get("/:aluno_id", authMiddleware, listarNotas);
router.put("/:id", authMiddleware, atualizarNota);
router.delete("/:id", authMiddleware, deletarNota);

module.exports = router;
