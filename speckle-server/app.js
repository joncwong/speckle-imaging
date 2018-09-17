var express = require('express')
var app = express()
require('dotenv').config();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 
app.get('/', function (req, res) {
  res.send('Hello World')
})


// Retrieve all olist
app.get('/olist', function (req, res) {
  con.query('SELECT * FROM dec14raw', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'olist files.' });
  });
});

app.listen(3000)
