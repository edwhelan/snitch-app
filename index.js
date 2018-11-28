//require dotenv file
require('dotenv').config();

// DATABASE
const db = require('./models/db');

// Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);

//Using Dependencies 
app.use(express.static('public')); //all static files will be served from the public server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//ROUTES


//ROOT
app.get('/', (req, res) =>
  res.send(
    'Helloworld'
  ));



// LISTEN ON PORT
app.listen(3000, () => {
  console.log(`Ready...`);
});