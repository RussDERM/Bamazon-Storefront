// Require all node packages
var mySQL = require('mySQL');
var inquirer = require('inquirer');
var colors = require('colors');
var strikes;


// Global variables
var div = '\n--------------------------------------------------------------------\n';
var divSml = '-------------------------------------------------------------------'

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
  mainFunction();
});


// Begin PSUDEO FOR PROGRAM
// Begin by building out all required functions?

// First build out, function to initialize the app, and display the contents of the store
// SELECT * FROM wares, then log the result appealingly.

function mainFunction() {
  waresQuery();
};


function waresQuery() {
  connection.query('SELECT * FROM wares', function (err, res) {
    if (err) throw err;
    var results = res;
    console.log('Welcome to IllWill, purveyor of used, cursed, and otherwise undesireable magic items.'.yellow.inverse.bold);
    console.log('Below you will find a list of our current offers, and their price. Please note the price is NOT negotiable. '.yellow.inverse.bold);
    console.log('-----------------------------------------------------------------------------------------------------------.'.yellow.inverse.bold);
    console.log('\nOur current wares:'.yellow.inverse.bold);

    // loop through results
    for (let i = 0; i < results.length; i++) {
      console.log(colors.white(divSml));
      console.log(colors.yellow.bold('Item ' + results[i].id + ' : ' + results[i].product_name));
      console.log(colors.white('Category: ' + results[i].department_name));
      console.log(colors.white('Price: ' + results[i].price));
      console.log(colors.white('Stock: ' + results[i].stock_quantity));
      console.log(colors.white(divSml));
    };
    connection.end();
  })
}
