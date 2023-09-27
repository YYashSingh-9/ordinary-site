const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
// creating an express app
const app = express();
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
