const express = require("express");
const router = express.Router();
const { Movie } = require("../database/models");

// Get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Get a single movie by ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// Add a new movie
router.post("/movies", async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, genre, duration } =
      req.body;
    const newMovie = new Movie({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      genre,
      duration,
    });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: "Failed to add movie" });
  }
});

// Update a movie
router.put("/movies/:id", async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, genre, duration } =
      req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, description, videoUrl, thumbnailUrl, genre, duration },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: "Failed to update movie" });
  }
});

// Delete a movie
router.delete("/movies/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

// Get billboard data
router.get("/billboard", async (req, res) => {
  try {
    // Finde die Gesamtanzahl der Filme
    const count = await Movie.countDocuments();

    // Wähle eine zufällige Position
    const random = Math.floor(Math.random() * count);

    // Finde einen zufälligen Film
    const billboard = await Movie.findOne().skip(random).exec();

    if (!billboard) {
      return res.status(404).send("No movies found");
    }

    res.json(billboard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch billboard data");
  }
});

module.exports = router;
