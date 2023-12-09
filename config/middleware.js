// Create a middleware to set flash messages on res.locals
module.exports.setflash = function (req, res, next) {
  // Set flash messages for success and error on res.locals
  res.locals.flash = {
    success: req.flash("success"), // Set success flash messages
    error: req.flash("error"), // Set error flash messages
  };

  // Continue to the next middleware or route handler
  next();
};
