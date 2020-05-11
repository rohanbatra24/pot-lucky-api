const Pool = require('pg').Pool;
const pool = new Pool({
	user     : 'final',
	host     : 'localhost',
	database : 'potlucky1',
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

module.exports = {
	getPantries
};
