const Fav = require("../Models/favProductModel");
const DefaultController = require("./DefaultController");
const CatchAsync = require("../Util/CatchAsync");

exports.postFavProduct = DefaultController.DefaultCreateOne(Fav);
exports.updateFavState = DefaultController.DefaultUpdateOne(Fav);
exports.deleteFav = CatchAsync(async (req, res, next) => {
  const prodId = req.body.productId;
  const doc = await Fav.deleteMany({ _id: { $in: prodId } });
  res.status(200).json({
    status: "success",
    data: doc,
  });
});
exports.getYourFavs = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const doc = await Fav.find({ user: { $in: userId } });
  req.body = doc;
  console.log(doc);
  res.status(200).json({
    status: "success",
    data: doc,
  });
});
