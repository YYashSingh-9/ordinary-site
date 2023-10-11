const Fav = require("../Models/favProductModel");
const DefaultController = require("./DefaultController");
const CatchAsync = require("../Util/CatchAsync");

exports.postFavProduct = DefaultController.DefaultCreateOne(Fav);
exports.updateFavState = DefaultController.DefaultUpdateOne(Fav);
exports.deleteFav = DefaultController.DefaultDeleteOne(Fav);
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
