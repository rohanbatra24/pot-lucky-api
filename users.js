const Pool = require('pg').Pool;
const pool = new Pool({
	user     : 'final',
	host     : 'localhost',
	database : 'potlucky1',
	password : 'root',
	port     : 5432
});

const getUsers = () => {
	return new Promise(function(resolve, reject) {
		pool.query('SELECT * FROM users;', (error, results) => {
			if (error) {
				reject(error);
			}
			resolve(results.rows);
		});
	});
};

module.exports = {
	getUsers
};
