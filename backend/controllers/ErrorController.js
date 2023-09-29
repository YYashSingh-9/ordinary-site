const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const developmentError = (err, req, res) => {
  //1.API
  const error = err.errors;
  //   console.log("🔥🔥🔥🔥🔥🔥", error, "😄😄😄😄");
  if (req.originalUrl.startsWith("/api")) {
    res.status(error.statusCode).json({
      error,
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
  }
};

module.exports = (err, req, res, next) => {
  //   const error = err;
  err.message = err.message || "message";
  err.statusCode = err.statusCode || 500;
  let error = JSON.parse(JSON.stringify(err));
  console.log(error);

  if (process.env.NODE_ENV === "development") {
    developmentError(err, req, res);
  }
  if (process.env.NODE_ENV === "production") {
  }
};
