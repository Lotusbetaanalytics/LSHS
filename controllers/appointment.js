const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Appointment = require("../models/Appointment");

// @desc    Create Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.createAppointment = asyncHandler(async (req, res, next) => {
  const exist = await Appointment.findOne({
    patient: req.body.patient,
  });
  if (exist) {
    const appointments = exist.appointments;
    const update = [
      {
        specialization: req.body.specialization,
        admin: req.body.doctor,
        date: req.body.date,
        time: req.body.time,
      },
    ];
    appointments.push(...update);
    await Appointment.findByIdAndUpdate(
      exist._id,
      {
        appointments: appointments,
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
    const appointments = [];

    const update = [
      {
        specialization: req.body.specialization,
        admin: req.body.doctor,
        date: req.body.date,
        time: req.body.time,
      },
    ];
    appointments.push(...update);
    req.body.appointments = appointments;
    await Appointment.create(req.body);
    res.status(201).json({
      success: true,
    });
  }
});

// @desc    Get Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.getAppointment = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete Admin
// @route   DELTE/api/v1/admin/:id
// @access   Private/Admin
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  await Appointment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Update Location
// @route   POST/api/v1/location/
// @access   Private/Admin
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  const admin = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
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
