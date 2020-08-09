const passport = require("passport");
const User = require("../../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.name);
  });

  passport.deserializeUser((name, done) => {
    User.getByUserName(name)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, null);
      });
  });
  return passport;
};
