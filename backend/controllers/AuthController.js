const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../Util/appError");

exports.signUpUser = async (req, res, next) => {
  try {
    const doc = await User.create(req.body);
    const token = jwt.sign({ id: doc.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      status: "Success",
      token,
      data: doc,
    });
    if (!doc) {
      return next(new AppError("Failed to create user", 404));
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //1. Checking if we recieved password and email , if not send error.
  if (!email || !password) {
    return next(new AppError("something went wrong", 404));
  }

  //2. Checking if user exists ?
  const user = await User.findOne({ email }).select("+password");

  //3. Checking if the password matches the on saved in DB
  const isPasswordCorrect = await user.correctPassword(password, user.password);
  if (!user || !isPasswordCorrect) {
    return next(new AppError("Password is incorrect.", 401));
  }
  //4. If all checks are clear then creating token and sending it
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
  });
};
