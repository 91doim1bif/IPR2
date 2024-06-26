const mongoose = require("mongoose");
const { Movie } = require("./models");

// Überprüfe, ob das Modell korrekt definiert ist
if (!Movie) {
  console.error(
    "Movie model is not defined correctly. Please check your models."
  );
  process.exit(1);
}

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
  {
    title: "Big Buck Bunny",
    description:
      "Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.",
    videoUrl:
      "https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
    genre: "Animation",
    duration: "9:56",
  },
  {
    title: "Sintel",
    description:
      "Sintel is a short computer-animated fantasy film by the Blender Institute.",
    videoUrl:
      "https://dn790004.ca.archive.org/0/items/Sintel/sintel-2048-surround.mp4",
    thumbnailUrl: "https://picfiles.alphacoders.com/124/124263.jpg",
    genre: "Fantasy",
    duration: "14:48",
  },
  {
    title: "Tears of Steel",
    description:
      "Tears of Steel is a short science fiction film by the Blender Institute.",
    videoUrl:
      "https://ia801705.us.archive.org/2/items/tearsofsteel_202010/TEARSOFSTEEL.mp4",
    thumbnailUrl:
      "https://m.media-amazon.com/images/M/MV5BNzNiMDUxYmItMzkyMS00MzlmLWJlNWYtYmUyMmFkZDE4MjExXkEyXkFqcGdeQXVyNjMxMTk1NTM@._V1_.jpg",
    genre: "Science Fiction",
    duration: "12:14",
  },

  {
    title: "A Trip to the Moon",
    description:
      "A Trip to the Moon is a French silent film directed by Georges Méliès.",
    videoUrl:
      "https://ia801004.us.archive.org/9/items/youtube-vFY5HibBi4A/A_Trip_to_the_Moon_-_1902-vFY5HibBi4A.mp4",
    thumbnailUrl:
      "https://i.pinimg.com/originals/8b/6d/b3/8b6db336b98cf9a123823cd48c536dfd.jpg",
    genre: "Science Fiction",
    duration: "12:52",
  },
];

const mongoURI = "mongodb://localhost:27017/test";

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
