const express = require("express");
const {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider,
} = require("../controllers/providerController");

const router = express.Router();

router.post("/providers", createProvider);
router.get("/providers", getProviders);
router.put("/providers/:id", updateProvider);
router.delete("/providers/:id", deleteProvider);

module.exports = router;
