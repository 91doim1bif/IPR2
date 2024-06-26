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

// Get profile name
router.get("/profile/:ProfileID", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.ProfileID);
    res.status(200).json(profile);
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

router.put("/profiles/:profileId/avatar", verifyToken, async (req, res) => {
  try {
    const { profileId } = req.params;
    const { image } = req.body;
    console.log(req.params);

    console.log(image);

    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.userId,
    });
    profile.image = image;
    await profile.save();
    res.json({ image: image });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting profile");
  }
});

router.put("/profiles/:profileId/name", verifyToken, async (req, res) => {
  try {
    const { profileId } = req.params;
    const { name } = req.body;

    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.userId,
    });
    profile.name = name;
    await profile.save();
    res.json({ name: name });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error changing profile name");
  }
});

module.exports = router;
