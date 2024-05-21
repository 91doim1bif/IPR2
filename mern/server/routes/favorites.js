const express = require("express");
const router = express.Router();
const { Movie } = require("../database/models");

// Get favorite movies by IDs
router.get("/favorites", async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ error: "No IDs provided" });
    }
    const movieIds = ids.split(",");
    console.log("Fetching favorites for IDs:", movieIds); // Debug log
    const favorites = await Movie.find({ _id: { $in: movieIds } });
    res.status(200).json(favorites);
  } catch (err) {
    console.error("Failed to fetch favorite movies:", err); // Debug log
    res.status(500).json({ error: "Failed to fetch favorite movies" });
  }
});

module.exports = router;
