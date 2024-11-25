const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorsController");

const router = express.Router();

// Rotas protegidas
router.post("/", authMiddleware, createAuthor);
router.get("/", authMiddleware, getAuthors);
router.get("/:id", authMiddleware, getAuthorById);
router.put("/:id", authMiddleware, updateAuthor);
router.delete("/:id", authMiddleware, deleteAuthor);

module.exports = router;
