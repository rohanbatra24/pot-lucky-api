
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS pantries CASCADE;
DROP TABLE IF EXISTS allergies CASCADE;
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS ingredients;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE pantries (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  quantity DECIMAL(10, 3) NOT NULL,
  unit VARCHAR(255) NOT NULL,
  expiry DATE
);

CREATE TABLE allergies (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE saved_recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  url TEXT NOT NULL,
  image TEXT NOT NULL,
  title VARCHAR(255) NOT NULL 
);

CREATE TABLE ingredients (
  name VARCHAR(255) NOT NULL,
  spoonacular_id INTEGER UNIQUE NOT NULL
);

COPY ingredients
FROM '/vagrant/final/pot-lucky-api/top_1k_ingredients.csv'
-- FROM '/Users/derek/Desktop/lighthouse/final/pot-lucky-api/top_1k_ingredients.csv'
DELIMITER ';';

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE pantries_id_seq RESTART WITH 1;
ALTER SEQUENCE allergies_id_seq RESTART WITH 1;
ALTER SEQUENCE saved_recipes_id_seq RESTART WITH 1;


INSERT INTO users (email)
VALUES ('a@gmail.com'),
       ('b@gmail.com'),
       ('c@gmail.com');

INSERT INTO pantries (user_id, name, quantity, unit, expiry)
VALUES (1, 'banana', 3.432, 'pieces', Now() + INTERVAL '1' HOUR),
       (1, 'sugar', 23, 'ounces', Now() + INTERVAL '2' HOUR),
       (1, 'turnip', 12, 'pieces', Now() + INTERVAL '3' HOUR),
       (2, 'lemon juice', .75, 'cups', Now() + INTERVAL '4' HOUR),
       (2, 'cinnamon', 1.95, 'tablespoons', Now() + INTERVAL '5' HOUR),
       (3, 'salt', 1, 'pinch', Now() + INTERVAL '6' HOUR);

INSERT INTO allergies (user_id, name)
VALUES (1, 'peanut'),
       (1, 'lactose'),
       (2, 'garlic'),
       (3, 'gluten');



