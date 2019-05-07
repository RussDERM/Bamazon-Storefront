// Require all node packages
var mySQL = require('mySQL');
var inquirer = require('inquirer');

// mySQL object
var connection = mySQL.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '$@Squatch!46',
  database: 'illwill',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('You are connected as id ' + connection.threadId + '\n');
});



// Initialize SQL connection