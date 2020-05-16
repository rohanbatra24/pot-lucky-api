const Pool = require('pg').Pool;
const pool = new Pool({
	user     : 'final',
	host     : 'localhost',
	database : 'potlucky',
	password : 'root',
	port     : 5432
});

const getUserByEmail = (email) => {
	return new Promise(function(resolve, reject) {
		const queryString = `
			SELECT users.id AS "id", email, name AS "allergy" 
			FROM users 
			JOIN allergies ON user_id = users.id 
			WHERE email = $1;`
		pool.query(queryString, [ email ], (error, results) => {
			if (error) {
				reject(error);
			}
			resolve(results.rows);
		});
	});
};

const addUserToDb = (email) => {
	const params = [ email ];
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
		.catch((err) => console.log('Error adding user to database!', err));
}

// Remove an allergy from the user's account
function removeAllergy(id, ingredient) {
	const params = [ id, ingredient ];

	const queryString = `
    DELETE
    FROM allergies
		WHERE user_id = $1
		AND name = $2;
  `;

	return pool
		.query(queryString, params)
		.then((res) => res)
		.catch((err) => console.log('Error removing item from pantry!', err));
}

// Add a new allergy to the user's account
function addAllergy(id, item) {
	const params = [ id, item ];

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
		.catch((err) => console.log('Error adding item to pantry!', err));
}
module.exports = {
	getUserByEmail,
	addUserToDb,
	removeAllergy,
	addAllergy
};
