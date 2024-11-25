const express = require("express");
const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

router.post("/services", createService);
router.get("/services", getServices);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

module.exports = router;
