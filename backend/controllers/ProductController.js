const Product = require("../Models/productModel");
const DefaultController = require("./DefaultController");

// FOLLOWED D.R.Y HERE ..
exports.getAllProducts = DefaultController.DefaultReadAll(Product);
exports.createNewProduct = DefaultController.DefaultCreateOne(Product);
exports.updateProduct = DefaultController.DefaultUpdateOne(Product);
exports.getOneProduct = DefaultController.DefaultGetOne(Product);
