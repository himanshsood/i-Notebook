const connectToMongo = require('./db');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

connectToMongo();

const app = express();

// Use express-session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.listen(5000, function () {
  console.log('Server is running at port 5000');
});
