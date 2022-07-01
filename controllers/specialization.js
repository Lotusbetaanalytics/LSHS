const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Specialization = require("../models/Specialization");

// @desc    Create Specialization
// @route   POST/api/v1/Specialization/
// @access   Private/Admin
exports.createSpecialization = asyncHandler(async (req, res, next) => {
  req.body.location = req.admin.location;
  const spec = await Specialization.create(req.body);
  res.status(201).json({
    success: true,
    data: spec,
  });
});

// @desc    Get ALl Specialization
// @route   POST/api/v1/Specialization
// @access   Private/Admin
exports.getSpecialization = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete Specialization
// @route   POST/api/v1/Specialization/
// @access   Private/Admin
exports.deleteSpecialization = asyncHandler(async (req, res, next) => {
  const spec = await Specialization.findByIdAndDelete(req.params.id);
  if (!spec) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});

// @desc    Update Specialization
// @route   POST/api/v1/Specialization/
// @access   Private/Admin
exports.updateSpecialization = asyncHandler(async (req, res, next) => {
  const spec = await Specialization.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!spec) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});
