const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Check = require("../models/Check");

// @desc    Create Frontdesk
// @route   POST/api/v1/frontdesk/
// @access   Private/Admin
exports.createCheck = asyncHandler(async (req, res, next) => {
  const check = await Check.create(req.body);
  res.status(201).json({
    success: true,
    data: check,
  });
});

// @desc    Get ALl Location
// @route   POST/api/v1/location
// @access   Private/Admin
exports.getCheck = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete Location
// @route   POST/api/v1/location/
// @access   Private/Admin
exports.deleteCheck = asyncHandler(async (req, res, next) => {
  const location = await Check.findByIdAndDelete(req.params.id);
  if (!location) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});

// @desc    Update Location
// @route   POST/api/v1/location/
// @access   Private/Admin
exports.updateCheck = asyncHandler(async (req, res, next) => {
  const location = await Check.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!location) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});
