const express = require("express");
const {
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment");
const Appointment = require("../models/Appointment");
const { protects, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protects, createAppointment)
  .get(
    protects,
    advancedResults(Appointment, [
      {
        path: "appointments.admin",
        select: "firstname lastname",
      },
      {
        path: "patient",
        select: "firstname lastname cardNo",
      },
      {
        path: "appointments.specialization",
        select: "name",
      },
    ]),
    getAppointment
  );
router
  .route("/:id")
  .put(protects, updateAppointment)
  .delete(protects, deleteAppointment);

module.exports = router;
