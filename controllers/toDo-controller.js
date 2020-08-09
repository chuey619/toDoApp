const ToDo = require("../models/toDo");

const toDoController = {};

toDoController.index = (req, res, next) => {
  ToDo.getAllForUser(req.user.id)
    .then((toDos) => {
      res.render("toDos/index", {
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
    description: req.body.description,
    title: req.body.title,
    category: req.body.category,
    status: "In progress",
    user_id: req.user.id,
  })
    .save()
    .then(() => {
      res.redirect(`/toDos`);
    })

    .catch(next);
};

toDoController.update = (req, res, next) => {
  ToDo.getById(req.params.id)
    .then((toDo) => {
      return toDo.update(req.body);
    })
    .then((updated) => {
      res.redirect(`/toDos/${updated.id}`);
    })
    .catch(next);
};

toDoController.delete = (req, res, next) => {
  ToDo.getById(req.params.id)
    .then((toDo) => {
      return toDo.delete();
    })
    .then(() => {
      res.redirect(`/toDos`);
    })
    .catch(next);
};

module.exports = toDoController;
