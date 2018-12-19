//require dotenv file
require('dotenv').config();

// DATABASE
const db = require('./models/db');

// Dependencies
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const session = require('express-session');
const path = require('path');
const pgSession = require('connect-pg-simple')(session);
const https = require('follow-redirects').https;

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

app.use(express.static(path.join(__dirname, 'client/build'))); // all static files will be served from public folder

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
const Votes = require(`./models/Votes`);

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
  Picture.getAllPictures()
    .then(results => {
      helper.showPictures(results)
        .then(allPictures => {
          res.send(
            page(`
            ${helper.header(req.session.user)}
            <div class='image-gallery'>${allPictures.join('')}</div>
            `)
          )
        })
    })
)


//post request to increase votevalue of ID to DB
app.post('/api/upvoteimage', (req, res) => {
  Picture.getPictureById(req.body.id)
    .then(results => {
      Picture.incrementPicture(results.votevalue, results.id)
        .then(r => {
          Votes.addVote(req.body.loggedInUser, req.body.id, true, false)
        })
    })
  res.send(
    `i received your POST request this is what you sent me: ${req.body.id}`
  )
})


//POST request to decrease votevalue of ID to DB on PICTURE DB  and
//then write to VOTES DB that user has voted
app.post('/api/downvoteimage', (req, res) => {
  Picture.getPictureById(req.body.id)
    .then(r => {
      Picture.decrementPicture(r.votevalue, r.id)
    }).then(data => {
      Votes.addVote(req.body.loggedInUser, req.body.id, false, true)
    })
  res.send(
    `i received your POST request this is what you sent me: ${req.body.id}`
  )
})

//GOOD ===============================================
//basic API call to get pictures from the DB
app.get('/api/getList', (req, res) => {
  Picture.getAllPictures()
    .then(r => res.send(r))
})

//twilio Picture add post
function getAddress(source) {
  return (
    new Promise(
      (resolve, reject) => {
        https.get(source, (res) => {
          const { statusCode } = res;
          const contentType = res.headers['content-type'];
          resolve(res.responseUrl)
        })
      }
    )
  )
}

app.post('/sms', (req, res) => {
  // console.log(req.body.MediaUrl0)
  const twiml = new MessagingResponse();
  getAddress(req.body.MediaUrl0)
    .then(results => {
      Picture.addPicture(results, req.body.From)
        .catch(err => { console.log(err) });
      twiml.message(`Hi! We recieved your Photo! Happy Snitching!`);
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    });
})

//LOGIN
app.get('/login', (req, res) =>
  res.send(
    page(`
  ${ helper.header(req.session.user)}
  ${ helper.registrationForm()}
  ${ helper.loginForm()}
            `))
);

app.get(`/api/loggedin`, (req, res) => {
  console.log(req.session.user)
  if (req.session.user) {
    return res.send(req.session.user)
  } else {
    console.log('not logged in')
  }
})

//LOGIN ===== POST ===+====== TESTED ON REACT
app.post(`/api/login`, (req, res) => {
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
        console.log(`you are now loggedin ${user}`)
        res.redirect(`/`);
      }
      else {
        console.log(`you did not logged in`)
        res.redirect(`/didnt/work `);
      }
    })
});

app.get(`/ registered`, (req, res) => {
  res.send(page(`
  ${ helper.header(req.session.user)}
          <p> you have registered</p > `))
})

// REGISTER ===== POST
app.post(`/register`, (req, res) => {
  User.addUser(req.body.displayName, req.body.email, req.body.phoneNumber, req.body.password)
    .then(user => {
      req.session.user = user;
      console.log(req.session.user);
      res.redirect(`/`)
    })
});

// LOGOUT ======== POST
app.post(`/logout`, (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

//VOTE ====== POST
app.post('/api/voteExist', protectRoute, (req, res) => {
  Votes.checkVoteExistence(req.body.user_id, req.body.id)
    .then(r => {
      res.send(
        `${r}`
      )
    })
  // Votes.addVote(req.body.name1, req.body.key, TRUE, FALSE)
})


// LISTEN ON PORT
app.listen(5000, () => {
  console.log(`Ready...`);
});