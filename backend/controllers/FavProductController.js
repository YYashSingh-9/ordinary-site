const Fav = require("../Models/favProductModel");
const DefaultController = require("./DefaultController");
const CatchAsync = require("../Util/CatchAsync");

exports.postFavProduct = DefaultController.DefaultCreateOne(Fav);
exports.getYourFavs = CatchAsync(async () => {
  const userId = req.user._id;
  const doc = await Fav.find({ user: { $in: userId } });
  req.body = doc;
  console.log(doc);
  res.status(200).json({
    status: "success",
    data: doc,
  });
});
