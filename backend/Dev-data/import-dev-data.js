const fs = require("fs");
const Product = require("../Models/productModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

// Parsing json data to store it in database (this needs to be done in order to proceed)
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

// Sending this data to database.
const importData = async () => {
  try {
    await Product.create(ProductData);
    console.log("Data sent successfuly.!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Deleting all the data from the database
const deleteData = async () => {
  try {
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Initializing the function with the use of terminal :)
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

//node import-dev-data.js --import - to initialize importData()
//node import-dev-data.js --delete - to initialize deleteData()
