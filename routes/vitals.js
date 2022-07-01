const express = require("express");
const {
  createVitals,
  getVitals,
  updateVitals,
  deleteVitals,
} = require("../controllers/vitals");
const Vitals = require("../models/Vitals");
const { protects, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protects, createVitals)
  .get(protects, advancedResults(Vitals), getVitals);
router.route("/:id").put(protects, updateVitals).delete(protects, deleteVitals);

module.exports = router;
