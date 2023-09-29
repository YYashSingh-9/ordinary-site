const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message || "message";
  error.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
  }
  if (process.env.NODE_ENV === "development") {
  }

  res.status(error.statusCode).json({
    status: "failed",
    error: error.message,
  });
};
