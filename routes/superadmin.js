const express = require("express");
const {
  createAdmin,
  login,
  getMe,
  getAdmins,
  forgotPassword,
  resetPassword,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/superadmin");
const SuperAdmin = require("../models/SuperAdmin");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createAdmin)
  .get(
    protect,
    advancedResults(SuperAdmin, [
      {
        path: "location",
        select: "name",
      },
    ]),
    getAdmins
  );
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router
  .route("/:id")
  .put(protect, authorize("SuperAdmin"), updateAdmin)
  .delete(protect, authorize("SuperAdmin"), deleteAdmin);

module.exports = router;
