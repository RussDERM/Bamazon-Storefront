// Require all node packages
var mySQL = require('mySQL');
var inquirer = require('inquirer');
var colors = require('colors');

// mySQL object
var connection = mySQL.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '$@Squatch!46',
  database: 'illwill',
});

// Initialize SQL connection
connection.connect(function (err) {
  if (err) throw err;
  console.log('You are connected as id ' + connection.threadId + '\n');
  showProducts();
});


// Begin PSUDEO FOR PROGRAM
// Begin by building out all required functions?

// First build out, function to initialize the app, and display the contents of the store
// SELECT * FROM wares, then log the result appealingly.

function showProducts() {
  connection.query('SELECT * FROM wares', function (err, res) {
    if (err) throw err;
    var results = res;

    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      console.log(results[i].product_name);
      console.log(results[i].department_name);
      console.log(results[i].price);
      console.log(results[i].stock_quantity);
    }

  })
  connection.end();
}


