CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(12) NOT NULL,
    email VARCHAR(255),
    password_digest TEXT
);
