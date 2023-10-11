const express = require("express");
const AuthController = require("../controllers/AuthController");
const OrderController = require("../controllers/OrdersController");

const OrdersRouter = express.Router();

OrdersRouter.use(AuthController.protect);

OrdersRouter.route("/my-orders")
  .get(OrderController.orderModifier)
  .post(OrderController.modifyOrderMiddleware, OrderController.postOrder);

OrdersRouter.route("/all-orders").get(OrderController.getAllOrders);
module.exports = OrdersRouter;
