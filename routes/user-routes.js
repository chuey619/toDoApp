const userRouter = require("express").Router();
const userController = require("../controllers/user-controller");
const authHelpers = require("../services/auth/auth-helpers");

userRouter.post("/", userController.create);
userRouter.get("/new", authHelpers.loginRedirect, (req, res) => {
  res.render("auth/register");
});

module.exports = userRouter;
