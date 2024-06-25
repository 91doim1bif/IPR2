const express = require("express");
const router = express.Router();
const { User, Profile, Movie } = require("../database/models");

// POST /api/favorite
router.post("/favorite/:ProfileID", async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).send("Movie ID is required");
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    const profile = await Profile.findById(req.params.ProfileID);
    //if (profile.favoriteIds.includes(movieId)) {
    //  return res.status(400).send("Movie is already in favorites");
    //}

    profile.favoriteIds.push(movieId);
    await profile.save();

    res.status(200).send("Movie added to favorites");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// DELETE /api/favorite/:movieId
router.delete("/favorite/:ProfileID/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const profile = await Profile.findById(req.params.ProfileID);
    const index = profile.favoriteIds.indexOf(movieId);
    if (index === -1) {
      return res.status(400).send("Movie is not in favorites");
    }

    profile.favoriteIds.splice(index, 1);
    await profile.save();

    res.status(200).send("Movie removed from favorites");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/favorites/:ProfileID", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.ProfileID);
    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    const movies = await Promise.all(
      profile.favoriteIds.map((movieId) => Movie.findById(movieId))
    );

    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching profiles");
  }
});

module.exports = router;
