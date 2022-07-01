const express = require("express");
const {
  createPatient,
  login,
  getMe,
  getPatient,
  updateProfile,
  uploadPhoto,
  deletePatient,
  updatePatient,
} = require("../controllers/patient");
const Patient = require("../models/Patient");
const { protect, protects, dual } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(dual, createPatient)
  .get(
    dual,
    advancedResults(Patient, [
      {
        path: "location",
        select: "name",
      },
    ]),
    getPatient
  );
router.route("/:id").delete(dual, deletePatient).put(dual, updatePatient);

router.route("/login").post(login);

router.route("/me").get(protects, getMe).put(protects, updateProfile);
router.route("/photo").post(protects, uploadPhoto);

module.exports = router;
