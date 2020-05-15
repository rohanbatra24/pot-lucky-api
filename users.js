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
		pool.query('SELECT * FROM users WHERE email=$1;', [ email ], (error, results) => {
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
module.exports = {
	getUserByEmail,
	addUserToDb
};
