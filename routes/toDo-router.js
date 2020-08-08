const toDosRouter = require("express").Router();

const toDosController = require("../controllers/toDo-controller");

toDosRouter.get("/", toDosController.index);

toDosRouter.post("/", toDosController.create);

toDosRouter.get("/add", (req, res) => {
  // res.render("toDos/new");
  res.send("working");
});

toDosRouter.get("/:id([0-9]+)", toDosController.show);

toDosRouter.get("/:id([0-9]+)/edit", toDosController.show, (req, res) => {
  // res.render("toDos/edit", {
  //   toDo: res.locals.toDo,
  // });
  res.send("working");
});

toDosRouter.put("/:id([0-9]+)", toDosController.update);

toDosRouter.delete("/:id", toDosController.delete);

module.exports = toDosRouter;
