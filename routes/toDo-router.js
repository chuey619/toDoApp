const toDosRouter = require("express").Router();

const toDosController = require("../controllers/toDo-controller");
const authHelpers = require("../services/auth/auth-helpers");

toDosRouter.get("/", authHelpers.loginRequired, toDosController.index);

toDosRouter.post("/", authHelpers.loginRequired, toDosController.create);

toDosRouter.get("/add", authHelpers.loginRequired, (req, res) => {
  res.render("toDos/add");
});

toDosRouter.get(
  "/:id([0-9]+)",
  authHelpers.loginRequired,
  toDosController.show,
  (req, res) => {
    res.render("toDos/show", {
      toDo: res.locals.toDo,
    });
  }
);

toDosRouter.get(
  "/:id([0-9]+)/edit",
  authHelpers.loginRequired,
  toDosController.show,
  (req, res) => {
    res.render("toDos/edit", {
      toDo: res.locals.toDo,
    });
  }
);

toDosRouter.put(
  "/:id([0-9]+)",
  authHelpers.loginRequired,
  toDosController.update
);

toDosRouter.delete("/:id", authHelpers.loginRequired, toDosController.delete);

module.exports = toDosRouter;
