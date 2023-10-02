const Cart = require("../Models/cartModel");
const DefaultController = require("./DefaultController");

exports.addToCart = DefaultController.DefaultCreateOne(Cart);
exports.updateCartItem = DefaultController.DefaultUpdateOne(Cart);
exports.getAllCartItem = DefaultController.DefaultReadAll(Cart);
exports.deleteFromCart = DefaultController.DefaultDeleteOne(Cart);
exports.getOneCartItem = DefaultController.DefaultGetOne(Cart);
exports.id_value_changer = (req, res, next) => {
  req.params.id = req.body.id;
  next();
};
