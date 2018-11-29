//require dotenv file
require('dotenv').config();

// DATABASE
const db = require('./models/db');

// Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

//Using Dependencies 
app.use(session({
  store: new pgSession({
    pgPromise: db
  }),
  secret: 'g8j3lsa0sk2bbfhv5486nfgvge-387356!', // remember to adjust before deploying
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 //Adjusts max time of session to 30 days
  }
}));

app.use(express.static('public')); //all static files will be served from the public server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  let isLoggedIn = req.session.user ? true : false;
  console.log(isLoggedIn);
  next();
})

// REQUIRE MODELS AND VIEWS FUNCTIONS
const page = require(`./views/page`);
const helper = require(`./views/helper`);

const User = require(`./models/Users`);

//protect route to ensure logged in user is accessing
function protectRoute(req, res, next) {
  let isLoggedIn = req.session.user ? true : false;
  if (isLoggedIn) {
    next();
  }
  else {
    res.redirect('/');
  }
}

//=======ROUTES===============
//ROOT
app.get('/', (req, res) =>
  res.send(
    page(`<h3>sup</h3>`)
  ));

//LOGIN
app.get('/login', (req, res) =>
  res.send(page(`
  ${helper.registrationForm()}
  ${helper.loginForm()}
  `))
);

//LOGIN ===== POST
app.get(`/loggedin`, (req, res) => {
  res.send(page(`<p>you are logged in</p>`))
})

app.post(`/login`, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getByEmail(email)
    .catch(err => {
      console.log(err);
    })
    .then(user => {
      const didMatch = user.checkPassword(password);

      if (didMatch) {
        req.session.user = user;
        console.log(req.session.user);
        res.redirect(`/loggedin`);
      }
      else {
        res.redirect(`/login`);
      }
    })
});

app.get(`/registered`, (req, res) => {
  res.send(page(`<p>you have registered</p>`))
})

// REGISTER ===== POST
app.post(`/register`, (req, res) => {
  User.addUser(req.body.displayName, req.body.email, req.body.phoneNumber, req.body.password)
    .then(user => {
      req.session.user = user;
      console.log(req.session.user);
      res.redirect(`/registered`)
    })
});

// LISTEN ON PORT
app.listen(3000, () => {
  console.log(`Ready...`);
});