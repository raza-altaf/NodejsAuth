const User = require("../models/User");

// Rendering home page
module.exports.homepage = function (req, res) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    return res.render("home");
  }
  // Redirect to login page if not authenticated
  return res.redirect("/login");
};

// Rendering signup page
module.exports.signupPage = function (req, res) {
  // Redirect to home page if already authenticated
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  return res.render("signup");
};

// Rendering login page
module.exports.loginPage = function (req, res) {
  // Redirect to home page if already authenticated
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  return res.render("login");
};

// Rendering reset page
module.exports.resetPage = function (req, res) {
  return res.render("resetPassword");
};

// Signup functionality
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirm_Password } = req.body;

    // Check if password and confirm password match
    if (password !== confirm_Password) {
      req.flash("error", "Password and confirm password do not match");
      return res.redirect("/");
    }

    // Check if user already exists in the database
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      req.flash("error", "User already exists");
      return res.redirect("/");
    }

    // Create a new user
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    req.flash("success", "User signed up successfully");
    return res.redirect("/login");
  } catch (error) {
    console.log("Oops! Something went wrong:", error);
  }
};

// Sign-in functionality
module.exports.signin = async (req, res) => {
  req.flash("success", "User logged in successfully");
  return res.redirect("/home");
};

// Password reset functionality
module.exports.reset = async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    req.flash("error", "User does not exist");
    return res.redirect("/reset");
  }

  // Check if the entered current password matches the one in the database
  if (user.password !== oldpassword) {
    req.flash("error", "Current password does not match");
    return res.redirect("/reset");
  }

  // Update the password
  user.password = newpassword;
  user.save();

  console.log("Password updated successfully");
  req.flash("success", "Password updated successfully");
  res.redirect("/login");
};

// Destroy session (logout)
module.exports.destroy = function (req, res, next) {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    req.flash("success", "You have logged out");
    res.redirect("/");
  });
};
