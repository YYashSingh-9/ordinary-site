const express = require("express");
const FavController = require("../controllers/FavProductController");
const AuthController = require("../controllers/AuthController");
const FavsRouter = express.Router();

FavsRouter.use(AuthController.protect);
FavsRouter.route("/my-favs")
  .get(FavController.getYourFavs)
  .post(FavController.postFavProduct)
  .patch(FavController.updateFavState);
module.exports = FavsRouter;
