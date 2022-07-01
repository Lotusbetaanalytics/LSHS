const express = require("express");
const {
  createAdmin,
  login,
  getMe,
  getAdmin,
  updateProfile,
  uploadPhoto,
  deleteAdmin,
  updateAdmin,
} = require("../controllers/admin");
const Admin = require("../models/Admin");
const { protect, protects, dual } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(dual, createAdmin)
  .get(
    dual,
    advancedResults(Admin, [
      {
        path: "location",
        select: "name",
      },
      {
        path: "specialization",
        select: "name",
      },
    ]),
    getAdmin
  );
router.route("/:id").delete(dual, deleteAdmin).put(dual, updateAdmin);

router.route("/login").post(login);

router.route("/me").get(protects, getMe).put(protects, updateProfile);
router.route("/photo").post(protects, uploadPhoto);

module.exports = router;
