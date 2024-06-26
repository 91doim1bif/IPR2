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
    videoUrl: "https://archive.org/download/Sintel/sintel-2048-surround.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Sintel_poster.jpg",
    genre: "Fantasy",
    duration: "14:48",
  },
  {
    title: "Tears of Steel",
    description:
      "Tears of Steel is a short science fiction film by the Blender Institute.",
    videoUrl:
      "https://archive.org/download/Tears_of_Steel/Tears_of_Steel_1080p.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Tears_of_Steel_film_poster.jpg",
    genre: "Science Fiction",
    duration: "12:14",
  },
  {
    title: "Caminandes: Llama Drama",
    description:
      "Caminandes: Llama Drama is a short animated film by the Blender Institute.",
    videoUrl:
      "https://archive.org/download/CaminandesLlamaDrama/caminandes_llama_drama.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Caminandes_Llama_Drama.jpg",
    genre: "Animation",
    duration: "2:30",
  },
  {
    title: "La Belle et la Bête",
    description:
      "La Belle et la Bête is a French romantic fantasy film directed by Jean Cocteau.",
    videoUrl:
      "https://archive.org/download/LaBelleEtLaBete_201303/LaBelleEtLaBete.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/La_Belle_et_La_Bete_1946.png",
    genre: "Fantasy",
    duration: "1:33:00",
  },
  {
    title: "A Trip to the Moon",
    description:
      "A Trip to the Moon is a French silent film directed by Georges Méliès.",
    videoUrl:
      "https://archive.org/download/A_Trip_To_The_Moon/A_Trip_To_The_Moon.mp4",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9f/Le_Voyage_dans_la_lune.jpg",
    genre: "Science Fiction",
    duration: "12:52",
  },
  {
    title: "Naruto Ep. 3",
    description:
      "The Great Train Robbery is a short silent Western film directed by Edwin S. Porter.",
    videoUrl:
      "https://archive.org/download/great_train_robbery/great_train_robbery.mp4",
    thumbnailUrl:
      "https://archive.org/download/10-naruto/10-naruto.thumbs/10%20Naruto_000660.jpg",
    genre: "Western",
    duration: "12:00",
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
