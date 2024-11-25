const express = require("express");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

router.post("/", serviceController.createService);
router.get("/", serviceController.getServices);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;
