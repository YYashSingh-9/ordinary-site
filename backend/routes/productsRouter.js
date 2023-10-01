const express = require("express");
const ProductController = require("../controllers/ProductController");
const ProductRouter = express.Router();

ProductRouter.route("/")
  .get(ProductController.getAllProducts)
  .post(ProductController.createNewProduct);

ProductRouter.route("/:id")
  .get(ProductController.getOneProduct)
  .patch(ProductController.updateProduct);
module.exports = ProductRouter;

// No delete product request because there is no use case of this request in this part.
