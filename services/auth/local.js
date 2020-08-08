const passport = reqiure("passport");
const LocalStrategy = require("./auth-helpers");
const User = require("../../models/user");

const init = require("./passport");
const authHelpers = require("./auth-helpers");

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.getByUserName(username)
      .then((user) => {
        if (!user) {
          return done(null, flase);
        }
        if (!authHelpers.comaprePass(password, user.password_digest)) {
          return done(null, flase);
        } else {
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
