const express = require("express");
const {
  createCheck,
  getCheck,
  updateCheck,
  deleteCheck,
} = require("../controllers/check");
const Check = require("../models/Check");
const { protects, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protects, createCheck)
  .get(protects, advancedResults(Check), getCheck);
router.route("/:id").put(protects, updateCheck).delete(protects, deleteCheck);

module.exports = router;
