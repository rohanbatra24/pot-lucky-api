# pot-lucky-api

## About 

This project contains the backend for the [Pot Lucky](https://github.com/rohanbatra24/pot-lucky) project. 
Follow the steps below and turn on the server before running the Pot Lucky app.

## Getting Started

Create a database in PostgreSQL called `potlucky`
In the `seeds.sql` file line 51, ensure the absolute path to `top_1k_ingredients.csv` is correct. 

Run `psql potlucky` to enter the database.
Run `\i seeds.sql` to seed your database. 

Exit PostgreSQL and run `node index.js`. This will start the express server and allow PotLucky to access it via the routes outlined in the  `index.js` file.

When you see `PotLucky API running on port XXXX`, this means you are all set up.

## Tools
* Express
* NodeJS
* PostgreSQL


--------
## Contributors

[Kelsey Griffin](https://github.com/kelsey-griffin)  
[Rohan Batra](https://github.com/rohanbatra24)  
[Derek Nugroho](https://github.com/dereknugroho)

