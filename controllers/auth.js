const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

/**
 * Register user
 * @route POST /api/v1/auth/register
 * @access Public
 */

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  /*Create User */
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  /*Create Token */
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

/**
 * Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  /*Validate Email & Password */
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  /*Check for User */
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  /*Check if Password matches */
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  /*Create Token */
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
