const appError = require("../Util/appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Handlers..
const handleCastError = (error) => {
  const message = `Invalid ${error.path}:${error.value}`;
  return new appError(message, 400);
};
const handleValidatorError = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  const message = `There is a validation error:-${error}`;
  return new appError(message, 400);
};
const handleDuplicateError = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Got a duplicate field here ${value}`;
  return new appError(message, 400);
};
const handleJWTError = () => {
  const message = "Invalid token , try again later.";
  return new appError(message, 400);
};
const handleJWTExpiredError = () => {
  const message = "Your valdation token expired try loging in again..";
  return new appError(message, 400);
};
// ERRORS FOR DEVELOPMENT MODE->FOR DEVELOPER
const developmentError = (err, req, res) => {
  //1.API
  console.log(err);
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      err,
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
  }
};

// ERRORS FOR THE END USER
const productionError = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //if any other programming error occured then send this
    //1. Console it.
    console.log("Error occured💥", err);
    //2. Send Generic message.
    return res.status(500).json({
      status: "Failed ",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  let errs = JSON.parse(JSON.stringify(err));
  err.message = err.message || "message";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    developmentError(err, req, res);
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...errs };
    error.message = err.message;
    if (error.name === "CastError") error = handleCastError(error);
    if (error.name === "ValidationError") error = handleValidatorError(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);
    productionError(error, req, res);
  }
};
