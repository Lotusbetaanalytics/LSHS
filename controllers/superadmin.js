const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const SuperAdmin = require("../models/SuperAdmin");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Create Admin
// @route   POST/api/v1/admin/
// @access   Private/Admin
exports.createAdmin = asyncHandler(async (req, res, next) => {
  req.body.name = req.body.firstname + " " + req.body.lastname;

  const findUser = await SuperAdmin.findOne({ email: req.body.email });

  if (findUser) {
    return next(new ErrorResponse("User Already exist", 400));
  }
  const admin = await SuperAdmin.create(req.body);
  //check for user
  res.status(201).json({
    success: true,
    data: admin,
  });
});

// @desc    Get ALl Admin
// @route   POST/api/v1/admin
// @access   Private/Admin
exports.getAdmins = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Login User
// @route   POST/api/v1/employee/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please Provide email and password", 400));
  }
  //check for user
  const staff = await SuperAdmin.findOne({ email: email }).select("+password");

  if (!staff) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //check if password match
  const isMatch = await staff.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(staff, 200, res);
});

// @desc    Log user out / clear cookie
// @route  GET /api/v1/auth/logout
// @access   Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   POST/api/v1/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const staff = await SuperAdmin.findById(req.sadmin.id);
  res.status(200).json({
    success: true,
    data: staff,
  });
});

// @desc    Reset Password
// @route   PUT/api/v1/employee/:resettoken
// @access   Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  //get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.id)
    .digest("hex");
  const staff = await SuperAdmin.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!staff) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  // set new password
  staff.password = req.body.password;
  staff.resetPasswordToken = undefined;
  staff.resetPasswordTokenExpire = undefined;
  await staff.save();

  sendTokenResponse(staff, 200, res);
});

// @desc    Forgot Password
// @route   POST/api/v1/employee/forgotpassword
// @access   Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await SuperAdmin.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/staff/resetPassword/${resetToken}`;

  const salutation = `Hello There!`;
  const content = ` You are receiving this email because you (or someone else) has requested
    the reset of a password, Click on the link below to reset your password 
    <br />
    <br />
    <a href="${resetUrl}" style="padding:1rem;color:white;background:green;border-radius:20px;">Click Here</a>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      salutation,
      content,
    });
    res.status(200).json({ success: true, data: "Email Sent" });
  } catch (err) {
    console.log(err);
    user.getResetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

//Get token from model, create cookie and send response
const sendTokenResponse = (staff, statusCode, res) => {
  //create token
  const token = staff.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc    Delete Employee
// @route   POST/api/v1/employee/
// @access   Private/Admin
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  const staff = await SuperAdmin.findByIdAndDelete(req.params.id);
  if (!staff) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});

// @desc    Update Admin
// @route   POST/api/v1/admin/
// @access   Private/Admin
exports.updateAdmin = asyncHandler(async (req, res, next) => {
  const staff = await SuperAdmin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(200).json({
    success: true,
  });
});
