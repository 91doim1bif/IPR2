const mongoose = require("mongoose");
const { Movie } = require("./models");

const movies = [
  {
    title: "Elephants Dream",
    description:
      "Elephants Dream is a short computer-animated film by the Blender Institute.",
    videoUrl: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Elephants_Dream_Emo_Proog_s6.jpg",
    genre: "Animation",
    duration: "10:53",
  },
];

const mongoURI =
  "mongodb+srv://mikailaktuerk99:fU01ACNxVMCzuiP6@customer.p3usn7i.mongodb.net/?retryWrites=true&w=majority&appName=Customer/database";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Insert the movie data into the database
    Movie.insertMany(movies)
      .then(() => {
        console.log("Movies inserted successfully");
        mongoose.disconnect(); // Disconnect after insertion
      })
      .catch((err) => {
        console.error("Failed to insert movies", err);
        mongoose.disconnect(); // Disconnect on error
      });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
