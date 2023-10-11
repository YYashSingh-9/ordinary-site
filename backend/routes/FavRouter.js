const express = require("express");
const FavController = require("../controllers/FavProductController");
const AuthController = require("../controllers/AuthController");
const CartController = require("../controllers/CartController");
const FavsRouter = express.Router();

FavsRouter.use(AuthController.protect);
FavsRouter.route("/my-favs")
  .get(FavController.getYourFavs)
  .post(FavController.postFavProduct)
  .patch(CartController.id_value_changer, FavController.updateFavState);

FavsRouter.route("/delete-fav").delete(
  CartController.id_value_changer,
  FavController.deleteFav
);
module.exports = FavsRouter;
