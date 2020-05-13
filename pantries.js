const Pool = require('pg').Pool;
const pool = new Pool({
	user     : 'final',
	host     : 'localhost',
	database : 'potlucky',
	password : 'root',
	port     : 5432
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

const getPantries = () => {
	return new Promise(function(resolve, reject) {
		pool.query('SELECT * FROM pantries WHERE user_id = 1;', (error, results) => {
			if (error) {
				console.error(error);
			}
			resolve(results.rows);
		});
	});
};

// Add a new item to the pantry
function addItemToPantry(item) {
	console.log('item ===> ', item);
	const params = [ 1, item.name, item.quantity, item.unit, item.expiry ];

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
		.catch((err) => console.log('Error adding item to pantry!', err));
}

// Remove an item from the pantry
function removeItemFromPantry(id) {
	const params = [ id ];
	console.log('id from backend===', typeof id);

	const queryString = `
    DELETE
    FROM pantries
    WHERE id = $1
  `;

	return pool
		.query(queryString, params)
		.then((res) => res)
		.catch((err) => console.log('Error removing item from pantry!', err));
}

module.exports = {
	getPantries,
	addItemToPantry,
	removeItemFromPantry
};
