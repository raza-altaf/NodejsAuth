const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Authentication using Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Field used for username in the request
      passReqToCallback: true, // Pass the entire request to the callback
    },
    async function (req, email, password, done) {
      try {
        // Find user and establish identity
        let user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
          req.flash("error", "Invalid user/password");
          console.log("User does not exist in the database");
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        req.flash("error", error.message);
        console.log("Error occurred during authentication:", error);
        return done(error);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.log("Error finding user in the database during deserialization");
    return done(error);
  }
});

// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // If the user is authenticated, pass the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next();
  }
  // Redirect to the login page if not authenticated
  return res.redirect("/user/login");
};

// Set the authenticated user in res.locals for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from the session cookie
    // and we are just sending it into locals for the view
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
