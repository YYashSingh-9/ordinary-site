const express = require("express");
const AuthController = require("../controllers/AuthController");
const OrderController = require("../controllers/OrdersController");

const OrdersRouter = express.Router();

OrdersRouter.use(AuthController.protect);

OrdersRouter.route("/my-orders")
  .get(OrderController.getAllOrders)
  .post(OrderController.postOrder);

module.exports = OrdersRouter;
