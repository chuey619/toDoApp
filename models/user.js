class User {
  constructor(user) {
    (this.id = user.id || null),
      (this.name = user.name),
      (this.email = user.email),
      (this.password_digest = user.password_digest);
  }
  static getById(id) {
    return db
      .oneOrNone(`SELECT * FROM users WHERE id = $1`, id)
      .then((user) => {
        if (user) return new this(user);
        throw new Error("To Do not found");
      });
  }
  save() {
    return db
      .one(
        `
      INSERT INTO users
      (name, email, password_digest)
      VALUES
      ($/name/, $/email/, $/password_digest/)
      RETURNING *`,
        this
      )
      .then((user) => {
        return Object.assign(this, user);
      });
  }
  update(changes) {
    Object.assign(this, changes);
    return db
      .oneOrNone(
        `
      UPDATE users SET
        name = $/name/,
        email = $/email/,
        password_digest = $/password_digest/
      WHERE id = $/id/
      RETURNING *
      `,
        this
      )
      .then((user) => {
        return Object.assign(this, user);
      });
  }
  delete() {
    return db.oneOrNone(`DELETE FROM users WHERE id = $1`, this.id);
  }
}
