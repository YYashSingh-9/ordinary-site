const express = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const UserRouter = express.Router();

// SIGNUP/LOGIN
UserRouter.route("/signup").post(AuthController.signUpUser);
UserRouter.route("/login").post(AuthController.loginUser);
UserRouter.route("/logout").post(AuthController.logoutUser);

// PROTECTION MIDDLEWARE..
UserRouter.use(AuthController.protect);

UserRouter.route("/updatePassword").patch(AuthController.updateMyPassword);
UserRouter.route("/me").get(UserController.Getme, UserController.getOneUser);
//This will be done by admin only
UserRouter.route("/:id").patch(UserController.updateMe);
UserRouter.route("/").get(UserController.getAllUsers);

module.exports = UserRouter;
