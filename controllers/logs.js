const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Admin = require("../models/Admin");
const Patient = require("../models/Patient");
const Specialization = require("../models/Specialization");

// @desc    Create Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.getLogs = asyncHandler(async (req, res, next) => {
  const doctor = await Admin.find({
    location: req.admin.location,
    role: "Doctor",
  });
  const nurse = await Admin.find({
    location: req.admin.location,
    role: "Nurse",
  });
  const patient = await Patient.find({ location: req.admin.location });
  const specialization = await Specialization.find({
    location: req.admin.location,
  });

  res.status(200).json({
    success: true,
    doctor,
    nurse,
    patient,
    specialization,
  });
});
