const express = require("express"),
  logger = require("morgan"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  passport = require("passport");

const authRouter = require("./routes/auth-router");
const toDoRouter = require("./routes/toDo-router");
const userRouter = require("./routes/user-routes");

const app = express();
require("dotenv").config();

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`to-do listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/toDos", toDoRouter);
app.use("*", (req, res) => {
  res.status(404).send({
    error: "Nothing to see here!",
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({ err, message: err.message });
});
