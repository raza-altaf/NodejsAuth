const express = require("express");
const passport = require("passport");
const router = express.Router();

// Import the controllers actions
const user_Controller = require("../controllers/userController");

// Rendering the home page as a signup page
router.get("/home", user_Controller.homepage);

// Rendering the signup page
router.get("/", user_Controller.signupPage);

// Rendering login page
router.get("/login", user_Controller.loginPage);

// Rendering reset page
router.get("/reset", user_Controller.resetPage);

// Log out route
router.get("/logout", user_Controller.destroy);

// Create new user in the database
router.post("/signup", user_Controller.signup);

// Update password in the database
router.post("/reset", user_Controller.reset);

// Google authentication route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  user_Controller.signin
);

// Create new session for user
router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/login" }),
  user_Controller.signin
);

module.exports = router;
