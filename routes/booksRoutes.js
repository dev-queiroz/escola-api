const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/booksController");

const router = express.Router();

// Rotas protegidas
router.post("/", authMiddleware, createBook);
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
