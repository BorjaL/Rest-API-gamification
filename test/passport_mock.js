var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;


passport.use(new BearerStrategy(function(token, done) {

  return done(null, token, token);
}));

passport.use(new LocalStrategy(function(username, password, done) {

  if (username === "wrong_username" || password === "wrong_password"){
    return done(null, false);
  }

  return done(null, "token", username);
}));

module.exports = passport;