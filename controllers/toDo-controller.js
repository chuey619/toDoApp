const ToDo = require("../models/toDo");

const toDoController = {};

toDoController.index = (req, res, next) => {
  ToDo.getAllForUser()
    .then((toDos) => {
      res.render("/toDos/index", {
        message: "ok",
        data: { toDos },
      });
    })
    .catch(next);
};

toDoController.show = (req, res, next) => {
  ToDo.getById(req.params.id)
    .then((toDo) => {
      res.locals.toDo = toDo;
      next();
    })
    .catch(next);
};

toDoController.create = (req, res, next) => {
  new ToDo({
    desciption: req.body.descrpition,
    title: req.body.title,
    category: req.body.category,
    status: req.body.status,
    user_id: req.user.id,
  })
    .save()
    .then(() => {
      res.redirect("/toDos/index");
    })

    .catch(next);
};

toDoController.update = (req, res, next) => {
  ToDo.getById(req.params.id)
    .then((toDo) => {
      return toDo.update(req.body);
    })
    .then((updated) => {
      res.redirect(`/${req.user.id}/${updated.id}`);
    })
    .catch(next);
};

toDoController.delete = (req, res, next) => {
  ToDo.getById(req.params.id)
    .then((toDo) => {
      res.redirect(`/${req.user.id}`);
    })
    .catch(next);
};

module.exports = toDoController;
