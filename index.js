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
//TWILIO REQUIREMENTS
const accountSid = process.env.TWILIO_accountSid; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_authToken;   // Your Auth Token from www.twilio.com/console
const http = require('http');
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
const MessagingResponse = twilio.twiml.MessagingResponse;


app.use((req, res, next) => {
  let isLoggedIn = req.session.user ? true : false;
  console.log(isLoggedIn);
  next();
})

// REQUIRE MODELS AND VIEWS FUNCTIONS
const page = require(`./views/page`);
const helper = require(`./views/helper`);

const User = require(`./models/Users`);
const Picture = require(`./models/Pictures`);

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
app.get('/', (req, res) => {
  Picture.getAllPictures()
    .then(results => {
      console.log(`Yo : ${results.length}`);
      helper.showPictures(results)
        .then((allPictures) => {
          console.log(allPictures)
          res.send(
            page(`
          ${helper.header(req.session.user)}
          <div>${allPictures.join('')}</div>
          <h3>sup</h3>
              `)
          )
        })

    })

});



//twilio Picture add post
app.post('/sms', (req, res) => {
  // console.log(req.body.MediaUrl0)
  const twiml = new MessagingResponse();
  //take req.body.MediaUrl0 and req.body.From and inject them into Pictures table.
  console.log(req.body);
  Picture.addPicture(req.body.MediaUrl0, req.body.From, 1)
    .catch(err => { console.log(err) });
  twiml.message(`Hi! We recieved your Photo! Happy Snitching!`);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});




//LOGIN
app.get('/login', (req, res) =>
  res.send(
    page(`
  ${ helper.header(req.session.user)}
  ${ helper.registrationForm()}
  ${ helper.loginForm()}
            `))
);

app.get(`/ loggedin`, (req, res) => {
  res.send(page(`
  ${ helper.header(req.session.user)}
          < p > you are logged in</p > `))
})

//LOGIN ===== POST
app.post(`/ login`, (req, res) => {
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
        res.redirect(`/ loggedin`);
      }
      else {
        res.redirect(`/ `);
      }
    })
});

app.get(`/ registered`, (req, res) => {
  res.send(page(`
  ${ helper.header(req.session.user)}
          < p > you have registered</p > `))
})

// REGISTER ===== POST
app.post(`/ register`, (req, res) => {
  User.addUser(req.body.displayName, req.body.email, req.body.phoneNumber, req.body.password)
    .then(user => {
      req.session.user = user;
      console.log(req.session.user);
      res.redirect(`/ registered`)
    })
});

// LOGOUT ======== POST
app.post(`/ logout`, (req, res) => {
  req.session.destroy();
  res.redirect('/');
})


// LISTEN ON PORT
app.listen(3000, () => {
  console.log(`Ready...`);
});