const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
      done(null, user);

  });


passport.use(new GoogleStrategy({
    clientID:     "",
    clientSecret: "",
    callbackURL: "",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // use the profile info to check if the user is registered in our db
      return done(null, user);
  }
));
