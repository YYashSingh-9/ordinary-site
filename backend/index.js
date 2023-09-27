const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const productRouter = require("./routes/productsRouter");

// creating an express app
const app = express();
dotenv.config({ path: "./config.env" });

// Route Mounting with express.js
app.use("/api/v2/products", productRouter);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
