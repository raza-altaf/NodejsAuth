const mongoose = require("mongoose");

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Add timestamps to track creation and modification dates
);

// Create the User model using the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
