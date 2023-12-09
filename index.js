const express = require("express");
const expresslayouts = require("express-ejs-layouts");

// Import the database configuration
const db = require("./config/mongoose");

const app = express();
const PORT = 3000;

// Import passport and authentication strategies
const passport = require("passport");
const LocalStretegy = require("./config/passport_local_stretegy");
const googleStretegy = require("./config/passport-google-oauth2-stretegy");

// Import session, flash, and custom middleware
const session = require("express-session");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

// Set up EJS for rendering views
app.use(expresslayouts);
app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScript", true);

// Middleware to parse incoming requests with urlencoded payloads
app.use(express.urlencoded());

// Set up sessions
app.use(
  session({
    name: "habit_tracker",
    secret: "balasomthing",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

// Initialize passport and use passport session
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in locals for views
app.use(passport.setAuthenticatedUser);

// Use flash messages
app.use(flash());
// Set flash messages for views
app.use(customMiddleware.setflash);

// Use routes from the 'routes' file
app.use("/", require("./routes"));

// Start the server
app.listen(PORT, () => {
  console.log("The app is running on port no ", PORT);
});
