const db = require("../db/config");
class ToDo {
  constructor(toDo) {
    (this.id = toDo.id || null),
      (this.title = toDo.title),
      (this.description = toDo.description),
      (this.status = toDo.status),
      (this.category = toDo.category),
      (this.user_id = toDo.user_id);
  }
  static getAllForUser(user_id) {
    return db
      .manyOrNone(`SELECT * FROM todo WHERE user_id = $1`, user_id)
      .then((toDos) => {
        return toDos.map((toDo) => new this(toDo));
      });
  }
  static getById(id) {
    return db.oneOrNone(`SELECT * FROM todo WHERE id = $1`, id).then((toDo) => {
      if (toDo) return new this(toDo);
      throw new Error("To Do not found");
    });
  }
  save() {
    return db
      .one(
        `
      INSERT INTO todo
      (title, description, status, category, user_id)
      VALUES
      ($/title/, $/description/, $/status/,$/category/, $/user_id/)
      RETURNING *`,
        this
      )
      .then((toDo) => {
        return Object.assign(this, toDo);
      });
  }
  update(changes) {
    Object.assign(this, changes);
    return db
      .oneOrNone(
        `
      UPDATE todo SET
        title = $/title/,
        description = $/description/,
        status = $/status/,
        category = $/category/
      WHERE id = $/id/
      RETURNING *
      `,
        this
      )
      .then((toDo) => {
        return Object.assign(this, toDo);
      });
  }
  delete() {
    return db.oneOrNone(`DELETE FROM todo WHERE id = $1`, this.id);
  }
}

module.exports = ToDo;
