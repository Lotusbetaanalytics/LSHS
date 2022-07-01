const express = require("express");
const { createMaternal, getMaternal } = require("../controllers/maternal");
const Maternal = require("../models/Maternal");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createMaternal)
  .get(protect, advancedResults(Maternal), getMaternal);

module.exports = router;
