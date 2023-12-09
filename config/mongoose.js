const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://4mohammedaltaf:WCm8Uqjos6uSJnCU@nodejsauth.edjuuh0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database conected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
