const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

// Rotas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rotas protegidas
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
