const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

// Options for the JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
  secretOrKey: "D@t@S3cUr1ty!P@ss", // Secret key used to verify the JWT signature
};

// Configure Passport to use the JWT strategy
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // Find the user in the database based on the email from the JWT payload
    User.findOne({ email: jwt_payload.email }, function (err, user) {
      if (err) {
        return done(err, false); // Return an error if there is one
      }
      if (user) {
        return done(null, user); // Return the user if found
      } else {
        return done(null, false); // Return false if no user is found
        // Alternatively, you could create a new account at this point
      }
    });
  })
);
