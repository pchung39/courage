var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: "412703275754858",
    clientSecret: "5996963dddfa8c45121975b6ee2ef835",
    callbackURL: "http://localhost:56827/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ "facebookId": profile.id }, function(err, user) {
      if (err) { return done(err); }
      console.log("Hi");
      done(null, user);
    });
  }
));


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

app.route("/auth/facebook")
.get(passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { scope: ["public_profile", "email", "user_friends"] }, { successRedirect: '/me',
                                      failureRedirect: '/' }));

module.exports = app;
