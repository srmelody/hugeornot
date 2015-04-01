var passport = require("passport");
var db = require('../db');

var OAuth2Strategy = require("passport-oauth2").Strategy;
var RALLY_URL = "https://test4cluster.rallydev.com"
var userService = require('../../services/userService');
var winston = require("winston");

passport.use(new OAuth2Strategy({
   
 
    callbackURL: "http://127.0.0.1:7000/oauth/redirect",
    authorizationURL: RALLY_URL + "/login/oauth2/auth",
	tokenURL: RALLY_URL + "/login/oauth2/token",
	clientID: process.env.RALLY_CLIENT_ID,
	clientSecret: process.env.RALLY_CLIENT_SECRET,
	scope: "openid profile",
	passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
  	console.log("passport", arguments);
    userService.successfulOauth(accessToken, function(err, user) {
    	console.log("callback from successful oauth", err, user );
	  if ((err != null ? err.code : void 0) === 401) {
	    return done(err, false, {
	      message: err.message
	    });
	  } else {
	    return done(err, user);
	  }
	});
  }
));

passport.serializeUser(function(user, done) {
  winston.info("serialize User " , user );
  done(null, {
    id: user._id,
    accessToken: user.accessToken
  });
});

passport.deserializeUser(function(sessionUser, done) {
	 winston.info("deserializeUser", sessionUser);
      return userService.findById(sessionUser.id, function(err, user) {
        if (!user) {
          return done(err, false, "Invalid session");
        }
        return done(err, user);
      });
    });
  