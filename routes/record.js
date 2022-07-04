const express = require("express");
const { getRecords } = require("../controllers/record");
const Record = require("../models/Record");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").get(
  protect,
  advancedResults(Record, [
    {
      path: "location",
      select: "name",
    },
  ]),
  getRecords
);

module.exports = router;
