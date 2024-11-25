const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createLoan,
  getLoans,
  getLoanById,
  returnLoan,
  deleteLoan,
} = require("../controllers/loansController");

const router = express.Router();

// Rotas protegidas
router.post("/", authMiddleware, createLoan);
router.get("/", authMiddleware, getLoans);
router.get("/:id", authMiddleware, getLoanById);
router.put("/:id/return", authMiddleware, returnLoan);
router.delete("/:id", authMiddleware, deleteLoan);

module.exports = router;
