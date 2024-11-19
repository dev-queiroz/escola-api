const express = require("express");
const {
  criarEscola,
  listarEscolas,
  atualizarEscola,
  deletarEscola,
} = require("../controllers/escolaController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, criarEscola);
router.get("/", authMiddleware, listarEscolas);
router.put("/:id", authMiddleware, atualizarEscola);
router.delete("/:id", authMiddleware, deletarEscola);

module.exports = router;
