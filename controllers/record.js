const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Record = require("../models/Record");

// @desc    Get ALl Location
// @route   POST/api/v1/location
// @access   Private/Admin
exports.getRecords = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
