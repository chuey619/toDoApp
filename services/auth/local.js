const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

const init = require("./passport");
const authHelpers = require("./auth-helpers");

const options = { usernameField: "name", passwordField: "password" };

init();

passport.use(
  new LocalStrategy(options, (name, password, done) => {
    User.getByUserName(name)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
          return done(null, false);
        } else {
          console.log("here");
          return done(null, user);
        }
      })
      .catch((err) => {
        console.log(err);
        return done(err);
      });
  })
);

module.exports = passport;
