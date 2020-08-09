const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

const userController = {
  index(req, res, next) {
    req.user.getAllToDos().then((toDos) => {
      res.render("toDos/index");
    });
  },
  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    new User({
      name: req.body.name,
      email: req.body.email,
      password_digest: hash,
    })
      .save()
      .then((user) => {
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect(`/toDos`);
        });
      })
      .catch(next);
  },
};

module.exports = userController;
