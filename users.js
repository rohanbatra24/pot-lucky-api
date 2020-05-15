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

module.exports = {
	getUserByEmail
};
