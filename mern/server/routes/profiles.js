const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { Profile } = require("../database/models"); // Ensure you have a Profile model defined

const router = express.Router();

// Get all profiles
router.get("/profiles", verifyToken, async (req, res) => {
  try {
    const profiles = await Profile.find({ userId: req.userId });
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching profiles");
  }
});

// Add a new profile
router.post("/profiles", verifyToken, async (req, res) => {
  try {
    const { name, image } = req.body;

    const newProfile = new Profile({
      userId: req.userId,
      name,
      image,
    });

    await newProfile.save();
    const profiles = await Profile.find({ userId: req.userId });

    res.status(201).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding profile");
  }
});

// Delete a profile
router.delete("/profiles/:profileId", verifyToken, async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await Profile.findOneAndDelete({
      _id: profileId,
      userId: req.userId,
    });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    const profiles = await Profile.find({ userId: req.userId });
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting profile");
  }
});

module.exports = router;
