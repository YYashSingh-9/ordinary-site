const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const productRouter = require("./routes/productsRouter");

// creating an express app
const app = express();
dotenv.config({ path: "./config.env" });

// Connecting to mongoDB databse____

//1. Creating database url link.. (connection string)
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
//2. establishing mongoDB connection with mongoose
mongoose
  .connect(DB)
  .then((con) => console.log("MongoDB connection successful"));

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// 1.Body parser middleware..
// This is body parser..(v.v.imp) this parses the data comming from request.
app.use(express.json());
// 2.Sanitizing from noSQL injections.
app.use(mongoSanitize());
// 3.Sanitizing from malicious HTMl code(XSS).
app.use(xss());
// 4.Sanitizing from Brute force/DOSS acttacks(rate limiter).
const limiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000,
  message: "Too many requests from this IP. Please try again later",
});
app.use("/api", limiter);

// Route Mounting with express.js
app.use("/api/v2/products", productRouter);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
