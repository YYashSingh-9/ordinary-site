const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const productRouter = require("./routes/productsRouter");
const UserRouter = require("./routes/userRouter");
const ErrorController = require("./controllers/ErrorController");

// creating an express app
const app = express();
// MIDDLEWARES START FROM HERE ___

// * Global middleware (CORS) (Cross Origin Resource Sharing)
app.use(cors());

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// 1.Body parser middleware & Cookie parser
// This is body parser..(v.v.imp) this parses the data comming from request.
app.use(express.json());
// This is cookie parser..
app.use(cookieParser());
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
// 5.Compressing the data shared -> this middleware compresses the data(JSON,BSON,Files,Images) shared.
app.use(compression());

// Route Mounting with express.js
app.use("/api/v2/products", productRouter); //Products
app.use("/api/v2/user", UserRouter); //Router

app.use(ErrorController);

module.exports = app;
