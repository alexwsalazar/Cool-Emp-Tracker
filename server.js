
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer")

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'P@rty',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Query database
db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
  console.log(err)
});



