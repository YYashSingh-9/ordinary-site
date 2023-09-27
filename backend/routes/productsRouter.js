const express = require("express");
const ProductController = require("../controllers/ProductController");
const ProductRouter = express.Router();

ProductRouter.route("/").get(ProductController.getAllProducts);

module.exports = ProductRouter;
