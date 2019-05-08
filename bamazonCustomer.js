// Require all node packages
var mySQL = require('mySQL');
var inquirer = require('inquirer');
var colors = require('colors');

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
    console.log('Welcome to IllWill, purveyor of used, cursed, and otherwise undesireable magic items.'.yellow.inverse.bold);
    console.log('Below you will find a list of our current offers, and their price. Please note the price is NOT negotiable. '.yellow.inverse.bold);
    console.log('-----------------------------------------------------------------------------------------------------------.'.yellow.inverse.bold);
    console.log('\nOur current wares:'.yellow.inverse.bold);

    // loop through results
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      console.log(colors.white(divSml));
      console.log(colors.yellow.bold('Item ' + results[i].id + ' : ' + results[i].product_name));
      console.log(colors.white('Category: ' + results[i].department_name));
      console.log(colors.white('Price: ' + results[i].price));
      console.log(colors.white('Stock: ' + results[i].stock_quantity));
      console.log(colors.white(divSml));
    };
  })
  connection.end();
}

function getSelection() {
  // Promopt user to select an item to purchase.
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the id number of the item you would like to buy.'.yellow.inverse,
      name: 'selection',
    }

  ])

};



// BEGIN PSUDEO FOR NEXT FUNCTION
// It will use inquirer to prompt input. 
// The prompt will be named SELECTION, to be called later in InquirerResponse.selection

// .then use a function that takes the inquirer.response and runs an evaluation function on it
// function evaluateResposne (inquirerResponse.selection) { log the specific item}
// This will then log the specific item again, and prompt another inquirer

// This inquirer will ask the customer how many they would like to purchase
// prompt will be named quantity
// call stockcheck function with inquirer.quantity to query the database to make sure that the quantity is acceptable

// function stockCheck(id, quantity) { query SELECT item FROM wares WHERE id = product_id }
// if stock < quantity, error
// otherwise, total up
// 

// That evaluation function will contain the logic needed to select the item, then ask the customer for a quantity
// Once a quantity has been entered, there must be a error catch if the customer has ordered more than stock allows
// Then, move into totaling price * quantity, and displaying the total to the customer.
// Then, deduct stock from the store's inventory