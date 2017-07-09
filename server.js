var express = require('express'),
  faker = require('faker'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  jwtSecret = 'jhskjdf5464mhsdh/6uk',
  app = express(),
  expressJwt = require('express-jwt'),

  // sudo database having registered user details to match
  user = {
    username: 'navneet',
    password: 'p'
  };

// Allows cross-origin-resource-sharing
app.use(cors());

// 
app.use(bodyParser.json());

// Intercepts all the request that comes in, takes the authorization header with the Bearer and the token, decode that token using jwtSecret, if it does decode properly, and the signature is verified, it adds user to the request object, and the user property will simply be the decoded JSON object.

app.use(expressJwt({
  secret: jwtSecret
}).unless({
  path: ['/login']
}));

// Responds fake random user object.
app.get('/random-user', function(req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

// responds to post request made by cliet when path in url is /login
app.post('/login', authenticate, function(req, res) {
  var token = jwt.sign({
    username: user.username
  }, jwtSecret);
  res.send({
    token: token,
    user: user
  });
});

// UTIL FUNCTIONS
function authenticate(req, res, next) {
  var body = req.body;
  if (!body.username || !body.password) {
    res.status(404).end('Must provide username or password');
  }
  if (body.username !== user.username || body.password !== user.password) {
    res.status(401).end('Incorrect username or password');
  }
  next();
}

app.get('/me', function(req, res) {
  res.send(req.user);
});

app.listen(3000, function() {
  console.log('App listening on localhost:3000');
});
