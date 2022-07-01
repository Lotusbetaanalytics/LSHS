const express = require("express");
const { getLogs } = require("../controllers/logs");
const { protects, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").get(protects, getLogs);

module.exports = router;
