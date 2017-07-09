var express = require('express'),
  faker = require('faker'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),

  // sudo database having registered user details to match
  user = {
    username: 'navneet',
    password: 'p'
  };

// Allows cross-origin-resource-sharing
app.use(cors());

// 
app.use(bodyParser.json());

app.get('/random-user', function(req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

// responds to post request made by cliet when path in url is /login
app.post('/login', authenticate, function(req, res) {
  res.send(user);
});

// UTIL FUNCTIONS
function authenticate(req, res, next) {
  var body = req.body;

  if (!body.username || !body.password) {
    res.status(404).end('Must provide username or password');
  }

  console.log('username: ' + body.username);
  console.log('password: ' + body.password);

  if (body.username !== user.username || body.password !== user.password) {
    res.status(401).end('Incorrect username or password');
  }
  next();
}

app.listen(3000, function() {
  console.log('App listening on localhost:3000');
});
