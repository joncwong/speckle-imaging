var express = require('express')
var app = express()
var cors = require('cors');
const port = 8080
require('dotenv').config();

var mysql = require('mysql');

app.use(cors());

var con = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Root 
app.get('/', function (req, res) {
  res.send('Root endpoint, nothing interesting here')
})

// Retrieve all olist
app.get('/olist', function (req, res) {
  con.query('SELECT * FROM olist', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'olist files.' });
  });
});

// Retreieve specific olist data with specified starId 
// DEPRECATED, THIS ENDPOINT IS NO LONGER NEEDED 
// app.get('/olist/:starId', function (req, res) {
//   let starId = req.params.starId;
//   con.query('SELECT * FROM dec14raw WHERE star_id=\'' + starId + '\'', function (error, results, fields) {
//       if (error) throw error;
//       return res.json({ error: false, data: results, message: 'olist files.' });
//   });
// });

// Retreieve metadata of star via coordinate search 
app.get('/coordinate/:starCoord', function (req, res) {
  let starCoord = req.params.starCoord;
  let starCoordSplit = starCoord.split(" ");
  let rightAsc = starCoordSplit[0];
  let dec = starCoordSplit[1];
  let validQuery = false;
  console.log("rightAsc: " + rightAsc); // Placeholder 
  console.log("dec: " + dec);
  con.query('SELECT * FROM olistv2 WHERE olistv2.right_asc=\'' + rightAsc + '\'' + 'AND olistv2.dec=\'' + dec + '\'', function (error, results, fields) {
    if (error) throw error;
    if (!results === undefined && result.length == 0) {
      console.log()
    }
    if (!results === undefined || !results.length == 0) {
      validQuery = true;
    }
    return res.json({ error: false, data: results, valid: validQuery });
  });
});

//CLONED above endpoint for now, change later to reflect an identifier query 
app.get('/identifier/:starCoord', function (req, res) {
  let starCoord = req.params.starCoord;
  let starCoordSplit = starCoord.split(" ");
  let rightAsc = starCoordSplit[0];
  let dec = starCoordSplit[1];
  let validQuery = false;
  console.log("rightAsc: " + rightAsc); // Placeholder 
  console.log("dec: " + dec);
  con.query('SELECT * FROM olistv2 WHERE olistv2.right_asc=\'' + rightAsc + '\'' + 'AND olistv2.dec=\'' + dec + '\'', function (error, results, fields) {
    if (error) throw error;
    if (!results === undefined || !results.length == 0) {
      validQuery = true;
    }
    return res.json({ error: false, data: results, valid: validQuery });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))