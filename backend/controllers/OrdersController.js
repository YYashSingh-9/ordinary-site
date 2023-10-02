const Order = require("../Models/ordersModel");
const DefaultController = require("./DefaultController");

exports.getAllOrders = DefaultController.DefaultReadAll(Order);
exports.postOrder = DefaultController.DefaultCreateOne(Order);
