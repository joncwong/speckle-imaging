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

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Root 
app.get('/', function (req, res) {
  res.send('HEALTHY')
})

// Retrieve all olist
app.get('/olist', function (req, res) {
  con.query('SELECT * FROM olist', function (error, results, fields) {
    if (error) throw error;
    return res.send({data: results, message: 'olist files.' });
  });
});

// Retreieve metadata of star via coordinate search 
app.get('/coordinate/:starCoord', function (req, res) {
  let starCoord = req.params.starCoord;
  let starCoordSplit = starCoord.split(" ");
  let rightAsc = starCoordSplit[0];
  let dec = starCoordSplit[1];
  let validQuery = false;
  let query = `SELECT metadata.star_id, metadata.fits_file, metadata.time,
                      metadata.blue_gain, metadata.red_gain, metadata.right_asc,
                      metadata.dec, metadata.epoch, metadata.mag, metadata.program_id,
                      metadata.objects, metadata.search_radius, 
                      olist.name, olist.olist_id, olist.file 
                      FROM metadata 
                      INNER JOIN olist ON metadata.olist_id = olist.olist_id
                      WHERE metadata.right_asc = ? AND metadata.dec= ?`
  console.log("rightAsc: " + rightAsc); // Placeholder 
  console.log("dec: " + dec);

  con.query(query, [rightAsc, dec], function (error, results, fields) {
    if (error) {
      return res.json({data: {}, olistFile:"", valid: false})
    }
    // if (!results === undefined && result.length == 0) {
    //   console.log()
    // }
    if (!results === undefined || !results.length == 0) {
      validQuery = true;
    }
    else {
      return res.json({data: {}, olistFile:"", valid: false})
    }
    olistFileString = results[0]['file'].toString('utf8')
    //console.log(results[0]['file'].toString('utf8'))
    for (var key in results) {
      delete results[key]['file']
    }
    return res.json({data: results, olistFile: olistFileString, valid: validQuery });
  });

});

//CLONED above endpoint for now, change later to reflect an identifier query 
app.get('/identifier/:starID', function (req, res) {
  let starID = req.params.starID;
  let validQuery = false;
  console.log("identifier: " + starID);
  let query = `SELECT metadata.star_id, metadata.fits_file, metadata.time,
                metadata.blue_gain, metadata.red_gain, metadata.right_asc,
                metadata.dec, metadata.epoch, metadata.mag, metadata.program_id,
                metadata.objects, metadata.search_radius, 
                olist.name, olist.olist_id, olist.file 
                FROM metadata 
                INNER JOIN olist ON metadata.olist_id = olist.olist_id
                WHERE metadata.star_id = ?`

  con.query(query, [starID], function (error, results, fields) {
    if (error) {
      return res.json({data: {}, olistFile:"", valid: false})
    }
    // if (!results === undefined && result.length == 0) {
    //   console.log()
    // }
    if (!results === undefined || !results.length == 0) {
      validQuery = true;
    }
    else {
      return res.json({data: {}, olistFile:"", valid: false})
    }
    olistFileString = results[0]['file'].toString('utf8')
    //console.log(results[0]['file'].toString('utf8'))
    for (var key in results) {
      //console.log(results[key]['file'])
      delete results[key]['file']
      //console.log(results[key]['file'])
      //console.log(results[key])
    }
    return res.json({data: results, olistFile: olistFileString, valid: validQuery });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
