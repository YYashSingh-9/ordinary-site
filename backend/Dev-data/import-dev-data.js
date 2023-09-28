const fs = require("fs");
const Product = require("../Models/productModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const ProductData = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);

//1. Creating database url link.. (connection string)
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
//2. establishing mongoDB connection with mongoose
mongoose
  .connect(DB)
  .then((con) => console.log("MongoDB connection successful"));

// sending this data to database.
const importData = async () => {
  try {
    await Product.create(ProductData);
    console.log("Data sent successfuly.!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);

//node import-dev-data.js
