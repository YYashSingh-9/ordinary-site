const express = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const UserRouter = express.Router();

// SIGNUP/LOGIN
UserRouter.route("/signup").post(AuthController.signUpUser);
UserRouter.route("/login").post(AuthController.loginUser);

// PROTECTION MIDDLEWARE..
UserRouter.use(AuthController.protect);
UserRouter.route("/logout").post(AuthController.logoutUser);

UserRouter.route("/update-me").patch(
  UserController.Getme,
  UserController.updateMe
);
UserRouter.route("/updatePassword").patch(
  UserController.Getme,
  AuthController.updateMyPassword
);
UserRouter.route("/me").get(UserController.Getme, UserController.getOneUser);
//This will be done by admin only
UserRouter.route("/").get(UserController.getAllUsers);

module.exports = UserRouter;
