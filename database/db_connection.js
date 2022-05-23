var mysql= require('mysql');
const dotenv = require("dotenv");
//initialize environment values
dotenv.config();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

module.exports = con