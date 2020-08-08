const passport = require("passport");
const User = require("../../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.name);
  });

  passport.deserializeUser((username, done) => {
    User.getByUserName(username)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, null);
      });
  });
  return passport;
};
