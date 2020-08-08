require("dotenv").config();
const DB_NAME = process.env.DB_NAME || "todos_db";
const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const db = require("pg-promise")(options);
function setDatabase() {
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    return db({
      database: DB_NAME,
      port: 5432,
      host: "localhost",
      user: process.env.USER,
      password: process.env.PASSWORD,
    });
  } else if (process.env.NODE_ENV === "production") {
    return db(process.env.DATABASE_URL);
  }
}

module.exports = setDatabase();
