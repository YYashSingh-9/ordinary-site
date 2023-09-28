const express = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = express.Router();

UserRouter.route("/").post(UserController.createUser);

module.exports = UserRouter;
