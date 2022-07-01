const express = require("express");
const {
  createSpecialization,
  getSpecialization,
  updateSpecialization,
  deleteSpecialization,
} = require("../controllers/specialization");
const Specialization = require("../models/Specialization");
const { protects, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protects, createSpecialization)
  .get(protects, advancedResults(Specialization), getSpecialization);
router
  .route("/:id")
  .put(protects, updateSpecialization)
  .delete(protects, deleteSpecialization);

module.exports = router;
