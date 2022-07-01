const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Maternal = require("../models/Maternal");

// @desc    Create Frontdesk
// @route   POST/api/v1/frontdesk/
// @access   Private/Admin
exports.createMaternal = asyncHandler(async (req, res, next) => {
  const form = await Maternal.create(req.body);
  res.status(201).json({
    success: true,
    data: form,
  });
});

// @desc    Get ALl Location
// @route   POST/api/v1/location
// @access   Private/Admin
exports.getMaternal = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
