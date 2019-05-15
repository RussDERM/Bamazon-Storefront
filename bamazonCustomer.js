// OFFICE HOUR QUESTIONS
// HOW DO I GET THE INQUIRER TO ASK THE SAME QUESTION AGAIN IF IT FAILS?

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
    itemQuery();
  })
}



function itemQuery() {
  // Ask the customer what item they are interested in
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the id number of the item you would like to buy.'.yellow.inverse,
      name: 'selection',

    }])

    // we then want to redisplay the item, in order to see the available quantity easily,
    // then prompt them for how much they would like to purchase

    .then(function (inquirerResponse) {
      connection.query('SELECT * FROM wares WHERE ?', { id: inquirerResponse.selection }, function (err, res) {
        if (err) throw err;
        var result = res[0];
        // log item again
        console.log(divSml);
        console.log('You have selected:');
        console.log(colors.white(divSml));
        console.log(colors.yellow.bold('Item ' + result.id + ' : ' + result.product_name));
        console.log(colors.white('Category: ' + result.department_name));
        console.log(colors.white('Price: ' + result.price));
        console.log(colors.white('Stock: ' + result.stock_quantity));
        console.log(colors.white(divSml));

        // prompt for quantitiy
        inquirer.prompt([
          {
            type: 'input',
            message: 'How many would you like?'.yellow.inverse,
            name: 'quantity',
          }])
          .then(function (inquirerResponse) {
            // if statement to check current stock.
            // using already delivered quantity
            // check if it is greater
            // if so, re-display original quality, and insult the customer's intelligence
            // ICEBOX, increment a variable of wrong attempts, and if it reaches two, end the connection.
            if (inquirerResponse.quantity > result.stock_quantity) {
              console.log(colors.red.inverse.bold('-------------------------------------------------------------------------------'));
              console.log(colors.red.inverse.bold('Pardon me, but I do not have enough of those                                   '));
              console.log(colors.red.inverse.bold('Please do not make this mistake again, I do not have the patience for mistakes.'));
              console.log(colors.red.inverse.bold('-------------------------------------------------------------------------------'));
              connection.end();
              return;
            }
            // else log the request
            console.log(divSml);
            console.log(colors.red.inverse('Your Selection is:'));
            console.log(colors.white(divSml));
            console.log(colors.red.bold('Item ' + result.id + ' : ' + result.product_name));
            console.log(colors.red('Quantity: ' + inquirerResponse.quantity));
            console.log(colors.red('Total: ' + result.price * inquirerResponse.quantity));
            console.log(colors.white(divSml));
            // update the store stock
            updateStock();
            function updateStock() {
              var stockleft = result.stock_quantity - inquirerResponse.quantity;

              connection.query('UPDATE wares SET ? WHERE ?', [{ stock_quantity: stockleft }, { id: inquirerResponse.selection }],
                function (err, res) {
                  if (err) throw err;
                  console.log(colors.yellow.inverse.bold('Our store now has ' + stockleft + ' of those peculiar ' + result.product_name + '(s) left!\n'));
                  console.log(colors.yellow.inverse.bold('We sure do appreciate the buisness...'));

                  connection.end();
                });
            };
          });

      })
    })

}
















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