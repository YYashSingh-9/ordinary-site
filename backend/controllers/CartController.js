const Cart = require("../Models/cartModel");
const DefaultController = require("./DefaultController");

exports.addToCart = DefaultController.DefaultCreateOne(Cart);
exports.updateCartItem = DefaultController.DefaultUpdateOne(Cart);
exports.getAllCartItem = DefaultController.DefaultReadAll(Cart);
exports.deleteFromCart = DefaultController.DefaultDeleteOne(Cart);
exports.getOneCartItem = DefaultController.DefaultGetOne(Cart);
exports.id_value_changer = (req, res, next) => {
  req.params.id = req.body._id;
  console.log(req.body._id);
  next();
};

exports.cartModifier = async (req, res, next) => {
  const userId = req.user._id;
  const doc = await Cart.find({ user: { $in: userId } });
  req.body = doc;
  console.log(doc);
  res.status(200).json({
    status: "success",
    data: doc,
  });
};
