const express = require("express");
const userController = require("../Controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/register", userController.register);
UserRouter.post("/login", userController.login);
UserRouter.get("/get-user", userController.getUser);
UserRouter.post("/get-user-with-email", userController.getUserWithMail);

module.exports = UserRouter;
