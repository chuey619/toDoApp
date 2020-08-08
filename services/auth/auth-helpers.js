const bcrypt = require("bcryptjs");

function comaprePass(req, res, next) {
  return bcrypt.compareSync(userPasword, databasePassword);
}

function loginRedirect(req, res, next) {
  if (req.user) return res.redirect(`/${req.user.name}`);
  return next();
}

function loginRequired(req, res, next) {
  if (!req.user) return res.redirect("/auth/login");
  next();
}

module.exports = {
  comaprePass,
  loginRedirect,
  loginRequired,
};
