const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Vitals = require("../models/Vitals");

// @desc    Create Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.createVitals = asyncHandler(async (req, res, next) => {
  const exist = await Vitals.findOne({
    patient: req.body.patient,
  });
  if (exist) {
    const vitals = exist.vitals;
    const update = [
      {
        bloodPressure: req.body.bloodPressure,
        heartRate: req.body.heartRate,
        glucoseLevel: req.body.glucoseLevel,
        bloodCount: req.body.bloodCount,
      },
    ];
    vitals.push(...update);
    await Vitals.findByIdAndUpdate(
      exist._id,
      {
        vitals: vitals,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
    });
  } else {
    const vitals = [];

    const update = [
      {
        bloodPressure: req.body.bloodPressure,
        heartRate: req.body.heartRate,
        glucoseLevel: req.body.glucoseLevel,
        bloodCount: req.body.bloodCount,
      },
    ];
    vitals.push(...update);
    req.body.vitals = vitals;
    await Vitals.create(req.body);
    res.status(201).json({
      success: true,
    });
  }
});

// @desc    Get Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.getVitals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete Admin
// @route   DELTE/api/v1/admin/:id
// @access   Private/Admin
exports.deleteVitals = asyncHandler(async (req, res, next) => {
  await Vitals.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Update Location
// @route   POST/api/v1/location/
// @access   Private/Admin
exports.updateVitals = asyncHandler(async (req, res, next) => {
  const admin = await Vitals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!admin) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});
