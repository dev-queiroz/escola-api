const express = require("express");
const {
  loginUsuario,
  registrarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", loginUsuario);
router.post("/registro", registrarUsuario);
router.put("/:id", authMiddleware, atualizarUsuario);
router.delete("/:id", authMiddleware, deletarUsuario);

module.exports = router;
