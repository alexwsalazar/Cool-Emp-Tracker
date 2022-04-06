const express = require('express');
const path = require('path');

// Import and require mysql2
const mysql = require('mysql2');
const api = require("./routes/....")


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", api);

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));
app.get("/index", (req, res) => {
	// responds by sending a specified html file to the request
	res.sendFile(path.join(__dirname, "public/index.html"));
});



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

/* USING APIs WITH ROUTE LISTENERS */
app.get('/api', (req, res) => {
    res.json(employee_db);
})



app.get("/", (req, res) => {
    db.query ('employee_db', (err, results) => {
      res.status(200).json(results)
    });
  })


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
