const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/User");

// Tell Passport to use a new strategy for Google login
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "287702193297-oucg0jmpdkol3btj1o4recum0sdme7rh.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://127.0.0.1:3000/users/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // Find user in the database
      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If user found, return the user
          return done(null, user);
        }

        // If user not found, create a new user and set it as req.user
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
        });

        if (newUser) {
          return done(null, newUser);
        }
      } catch (error) {
        console.log("Error in Google Strategy Passport:", error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
