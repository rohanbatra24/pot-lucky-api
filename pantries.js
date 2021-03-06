const Pool = require("pg").Pool;
const pool = new Pool({
  user: "kzbkjuzbftqria",
  host: "ec2-34-193-232-231.compute-1.amazonaws.com",
  database: "dbc6j8d1fjjao1",
  password: "02912f2dde074205f278bdb29aa21621e8b04f787e61ae497ae90f507f736cf1",
});
// const getPantries = (user_id) => {
// 	return new Promise(function(resolve, reject) {
// 		queryString = 'SELECT * FROM pantries WHERE user_id = $1;';
// 		queryParams = [ user_id ];
// 		pool.query(queryString, queryParams, (error, results) => {
// 			if (error) {
// 				reject(error);
// 			}
// 			resolve(results.rows);
//         });

//     });

// };

const getPantries = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM pantries WHERE user_id = $1;",
      [id],
      (error, results) => {
        if (error) {
          console.error(error);
        }
        resolve(results.rows);
      }
    );
  });
};

// Add a new item to the pantry
function addItemToPantry(item) {
  const params = [item.id, item.name, item.quantity, item.unit, item.expiry];

  const queryString = `
    INSERT INTO pantries
    (user_id, name, quantity, unit, expiry)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;
  `;

  return pool
    .query(queryString, params)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log("Error adding item to pantry!", err));
}

// Edit an item in the pantry
function editPantryItem(user_id, values) {
  const { itemId, unit, quantity, expiry } = values;
  const queryParams = [unit, quantity, expiry, itemId];
  const queryString = `
		UPDATE pantries
		SET unit=$1, quantity=$2, expiry=$3
		WHERE id=$4;
	`;
  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log("Error adding item to pantry!", err));
}

// Remove an item from the pantry
function removeItemFromPantry(id) {
  const params = [id];

  const queryString = `
    DELETE
    FROM pantries
    WHERE id = $1
  `;

  return pool
    .query(queryString, params)
    .then((res) => res)
    .catch((err) => console.log("Error removing item from pantry!", err));
}

function getIngredients() {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM ingredients;", (error, results) => {
      if (error) {
        console.error(error);
      }
      resolve(results.rows);
    });
  });
}

module.exports = {
  getPantries,
  addItemToPantry,
  removeItemFromPantry,
  getIngredients,
  editPantryItem,
};
