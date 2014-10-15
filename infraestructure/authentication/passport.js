var passport = require('passport');
BearerStrategy = require('passport-http-bearer').Strategy;
LocalStrategy = require('passport-local').Strategy;
var redis = require('../redis'); 

passport.use(new BearerStrategy(function(token, done) {
	redis.get(token, function(err, player_name) {
        if (err) { return done(err); }
        if (!player_name) { return done(null, false); }
        return done(null, token);
     });
 }));

passport.use(new LocalStrategy(function(username, password, done) {

    player_service.logIn(username, password, function(err, username) {
        if (err) { return done(err); }
        if (!username) { 
        	return done(null, false, "Wrong credentials"); 
        }
        return done(null, redis.set(username));
      });
  }
));

module.exports = passport