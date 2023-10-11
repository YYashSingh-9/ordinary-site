const Order = require("../Models/ordersModel");
const Cart = require("../Models/cartModel");
const DefaultController = require("./DefaultController");
const CatchAsync = require("../Util/CatchAsync");

exports.getAllOrders = DefaultController.DefaultReadAll(Order);
exports.postOrder = DefaultController.DefaultCreateOne(Order);

exports.modifyOrderMiddleware = CatchAsync(async (req, res, next) => {
  const cartIds = [...req.body.ids];
  const doc = await Cart.find({ _id: { $in: cartIds } });
  req.body = doc;
  await Cart.deleteMany({ _id: { $in: cartIds } });
  next();
});
exports.orderModifier = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const doc = await Order.find({ user: { $in: userId } });
  req.body = doc;
  console.log(doc);
  res.status(200).json({
    status: "success",
    data: doc,
  });
});
