const express = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const UserRouter = express.Router();

// SIGNUP/LOGIN
UserRouter.route("/signup").post(AuthController.signUpUser);
UserRouter.route("/login").post(AuthController.loginUser);

UserRouter.route("/updatePassword").patch(AuthController.updateMyPassword);
//This will be done by admin only
UserRouter.route("/:id").patch(UserController.updateUser);
UserRouter.route("/").get(AuthController.protect, UserController.getAllUsers);

module.exports = UserRouter;
