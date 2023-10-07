const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const appError = require("../Util/appError");
const catchAsync = require("../Util/CatchAsync");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//HELPER FUNCTIONS
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
const createSendToken_with_cookie = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    sameSite: "none",
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

//SIGN-UP USER(CREATING A USER)
exports.signUpUser = catchAsync(async (req, res, next) => {
  const doc = await User.create(req.body);

  if (!doc) {
    return next(new appError("Failed to create user", 400));
  }
  createSendToken_with_cookie(doc, 200, res);
});

//LOGIN USER
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
  createSendToken_with_cookie(user, 200, res);
});

//UPDATING USER PASSWORD
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (!req.body.password || !req.body.passwordCurrent) {
    return next(
      new appError("Required Fields are not filled properly, try again.", 400)
    );
  }
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new appError("Password sent is incorrect, try again.", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.password;
  await user.save(); //important - this saves the above changes
  createSendToken_with_cookie(user, 200, res);
});

//PROTECT MIDDLEWARE FOR SPECIFIC ROUTES
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1.Checking for token..
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log(token);
  }
  //2.If no token then return.
  if (!token) {
    return next(new appError("Can't identify token , try again.", 400));
  }
  //3.Verifying token and extracting decoded object.
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);✅
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //4.Finding user with id from decodedToken object.
  const current_user = await User.findById(decodedToken.id);
  //5.Forwarding user to req so that secure routes can have access to user property
  req.user = current_user;
  next();
});

//LOGOUT USER
exports.logoutUser = (req, res, next) => {
  console.log("this worked");
  res.cookie("jwt", "logout", {
    expiresIn: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "Success",
  });
};
