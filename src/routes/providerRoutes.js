const express = require("express");
const providerController = require("../controllers/providerController");

const router = express.Router();

router.post("/", providerController.createProvider);
router.get("/", providerController.getProviders);
router.put("/:id", providerController.updateProvider);
router.delete("/:id", providerController.deleteProvider);

module.exports = router;
