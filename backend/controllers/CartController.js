const Cart = require("../Models/cartModel");
const DefaultController = require("./DefaultController");

exports.addToCart = DefaultController.DefaultCreateOne(Cart);
exports.updateCartItem = DefaultController.DefaultUpdateOne(Cart);
exports.getCartItem = DefaultController.DefaultReadAll(Cart);
// exports.deleteFromCart = DefaultController.
