const Pool = require("pg").Pool;
const pool = new Pool({
  user: "",
  host: "",
  database: "",
  password: "",
});

const getUserByEmail = (email) => {
  return new Promise(function (resolve, reject) {
    const queryString = `
		SELECT users.id AS "id", email, name AS "allergy", url, title, image
		FROM users
		FULL JOIN allergies ON users.id = allergies.user_id
		FULL JOIN saved_recipes ON users.id = saved_recipes.user_id
		WHERE email = $1;`;
    pool.query(queryString, [email], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const addUserToDb = (email) => {
  const params = [email];
  const queryString = `
    INSERT INTO users
    (email)
		VALUES ($1)
		RETURNING *;
  `;

  return pool
    .query(queryString, params)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log("Error adding user to database!", err));
};

// Remove an allergy from the user's account
function removeAllergy(id, ingredient) {
  const params = [id, ingredient];

  const queryString = `
    DELETE
    FROM allergies
		WHERE user_id = $1
		AND name = $2;
  `;

  return pool
    .query(queryString, params)
    .then((res) => res)
    .catch((err) => console.log("Error removing item from pantry!", err));
}

// Add a new allergy to the user's account
function addAllergy(id, item) {
  const params = [id, item];

  const queryString = `
    INSERT INTO allergies
    (user_id, name)
		VALUES ($1, $2)
		RETURNING *;
  `;

  return pool
    .query(queryString, params)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log("Error adding item to pantry!", err));
}

function addSavedRecipe(id, item) {
  const params = [id, item.url, item.image, item.title];

  const queryString = `
    INSERT INTO saved_recipes
    (user_id, url,image,title)
		VALUES ($1, $2,$3,$4)
		RETURNING *;
  `;

  return pool
    .query(queryString, params)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log("Error adding item to saved recipe!", err));
}

function removeSavedRecipe(url) {
  const params = [url];

  const queryString = `
    DELETE
    FROM saved_recipes
		WHERE url = $1;
  `;

  return pool
    .query(queryString, params)
    .then((res) => res)
    .catch((err) => console.log("Error removing item from pantry!", err));
}

module.exports = {
  getUserByEmail,
  addUserToDb,
  removeAllergy,
  addAllergy,
  addSavedRecipe,
  removeSavedRecipe,
};
