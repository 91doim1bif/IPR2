const mongoose = require("mongoose");
const { Account, VerificationToken, Movie, User } = require("./models");

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  try {
    // Create the models in the new database
    await Promise.all([
      Account.createCollection(),
      VerificationToken.createCollection(),
      Movie.createCollection(),
      User.createCollection(),
    ]);

    console.log("Models created successfully");
    mongoose.disconnect(); // Close the connection
  } catch (error) {
    console.error("Failed to create models:", error);
    mongoose.disconnect(); // Close the connection
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB", err);
});
