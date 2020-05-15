const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const bodyparser = require('body-parser');

const users = require('./users');
const pantries = require('./pantries');

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

// app.use(function(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
// 	next();
// });

app.get('/api/users/:email', (req, res) => {
	const email = req.params.email;
	users
		.getUserByEmail(email)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.get('/api/ingredients/all', (req, res) => {
	pantries
		.getIngredients()
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.get('/api/pantries/all', (req, res) => {
	pantries
		.getPantries(1)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.post('/api/pantries/add', (req, res) => {
	pantries
		.addItemToPantry(req.body)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.post('/api/pantries/delete', (req, res) => {
	console.log('req body======', req.body.id);

	pantries
		.removeItemFromPantry(req.body.id)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
