const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const productRouter = require("./routes/productsRouter");
const UserRouter = require("./routes/userRouter");
const ErrorController = require("./controllers/ErrorController");

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

// MIDDLEWARES START FROM HERE ___

// * Global middleware (CORS) (Cross Origin Resource Sharing)
app.use(cors());

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
// 5.Compressing the data shared -> this middleware compresses the data(JSON,BSON,Files,Images) shared.
app.use(compression());

// Route Mounting with express.js
app.use("/api/v2/products", productRouter); //Products
app.use("/api/v2/user", UserRouter); //Router

app.use(ErrorController);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
