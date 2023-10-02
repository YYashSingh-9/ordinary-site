const express = require("express");
const AuthController = require("../controllers/AuthController");
const cartController = require("../controllers/CartController");
const UserController = require("../controllers/UserController");
const cartRouter = express.Router();

cartRouter.use(AuthController.protect);
cartRouter
  .route("/")
  .post(cartController.addToCart)
  .get(cartController.getAllCartItem)
  .patch(cartController.id_value_changer, cartController.updateCartItem)
  .delete(cartController.id_value_changer, cartController.deleteFromCart);

cartRouter.route("/:id").get(cartController.getOneCartItem);

module.exports = cartRouter;
