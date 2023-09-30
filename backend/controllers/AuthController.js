const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const appError = require("../Util/appError");
const catchAsync = require("../Util/CatchAsync");

exports.signUpUser = catchAsync(async (req, res, next) => {
  const doc = await User.create(req.body);
  if (!doc) {
    return next(new appError("Failed to create user", 400));
  }
  const token = jwt.sign({ id: doc.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "Success",
    token,
    data: doc,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1. Checking if we recieved password and email , if not send error.
  if (!email || !password) {
    return next(new appError("something went wrong", 404));
  }

  //2. Checking if user exists ?
  const user = await User.findOne({ email }).select("+password");
  //3. Checking if the password matches the on saved in DB
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Password is incorrect.", 401));
  }
  //4. If all checks are clear then creating token and sending it
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
  });
});
