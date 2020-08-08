CREATE TABLE toDO (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    status VARCHAR,
    category VARCHAR,
    user_id INTEGER REFERENCES users(id)
);