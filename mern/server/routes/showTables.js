const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

const {
  Account,
  VerificationToken,
  Movie,
  User,
} = require("../database/models");

// Your route handlers go here

const saltRounds = 10;

module.exports = router;

// Define a route to get all collections
router.get("/api/collections", async (req, res) => {
  try {
    // Get all collections from the MongoDB database
    const collections = await mongoose.connection.db.collections();

    // Return the list of collections as JSON
    res.json(collections.map((collection) => collection.collectionName));
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define a route to get all keys for a specific collection
router.get("/api/keys/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;

    // Check if the collection exists
    const collections = await mongoose.connection.db.collections();
    const collectionExists = collections.some(
      (collection) => collection.collectionName === collectionName
    );

    if (!collectionExists) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Fetch a single document from the specified collection
    const collection = mongoose.connection.db.collection(collectionName);
    const document = await collection.findOne();

    if (!document) {
      return res
        .status(404)
        .json({ error: "No documents found in collection" });
    }

    // Extract keys (field names) from the document
    const keys = Object.keys(document);

    res.json(keys);
  } catch (error) {
    console.error("Error fetching keys:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define a route to get all documents from a specified collection
router.get("/api/table/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;

    // Check if the collection exists
    const collections = await mongoose.connection.db.collections();
    const collectionExists = collections.some(
      (collection) => collection.collectionName === collectionName
    );

    if (!collectionExists) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Fetch all documents from the specified collection
    const collection = mongoose.connection.db.collection(collectionName);
    const documents = await collection.find({}).toArray();

    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define a route to get the entire table data for a specific collection with pagination and optional filtering
router.get("/api/tables/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || "";

    // Check if the collection exists
    const collections = await mongoose.connection.db.collections();
    const collectionExists = collections.some(
      (collection) => collection.collectionName === collectionName
    );

    if (!collectionExists) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const coll = mongoose.connection.db.collection(collectionName);
    const document = await coll.findOne();

    // Construct filter condition
    const filterCondition = {
      $or: [
        // Filter condition for first key
        {
          [Object.keys(document)[1]]: {
            $regex: filter,
            $options: "i",
          },
        },
        // Additional filter conditions can be added here for other keys if needed
      ],
    };

    // Fetch total count with filtering
    const collection = mongoose.connection.db.collection(collectionName);
    const totalCount = await collection.countDocuments(filterCondition);

    // Fetch documents with pagination and filtering
    const tableData = await collection
      .find(filterCondition)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({ tableData, totalCount });
  } catch (error) {
    console.error("Error fetching table data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add element to a specific collection endpoint
router.post("/api/add-element/:collectionName", async (req, res) => {
  try {
    const { collectionName } = req.params;

    // Check if the collection exists
    const availableCollections = [
      "Account",
      "VerificationToken",
      "Movie",
      "User",
    ];
    if (!availableCollections.includes(collectionName)) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Determine the appropriate Mongoose model based on the collection name
    let ElementModel;
    switch (collectionName) {
      case "Account":
        ElementModel = Account;
        break;
      case "VerificationToken":
        ElementModel = VerificationToken;
        break;
      case "Movie":
        ElementModel = Movie;
        break;
      case "User":
        ElementModel = User;
        break;
      default:
        return res.status(404).json({ error: "Collection not found" });
    }

    // Validate req.body against the schema of the selected collection
    const newElement = new ElementModel(req.body);
    const validationError = newElement.validateSync(); // Synchronous validation
    if (validationError) {
      const errorMessage = validationError.errors
        ? Object.values(validationError.errors)[0].message
        : "Validation failed";
      return res.status(400).json({ error: errorMessage });
    }

    // Create new element using the validated data
    await newElement.save();

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding element");
  }
});

// Delete element from a specific collection endpoint
router.delete(
  "/api/delete-element/:collectionName/:elementId",
  async (req, res) => {
    console.log("test 1");
    try {
      const { collectionName, elementId } = req.params;

      // Check if the collection exists
      const availableCollections = [
        "Account",
        "VerificationToken",
        "Movie",
        "User",
      ];
      if (!availableCollections.includes(collectionName)) {
        return res.status(404).json({ error: "Collection not found" });
      }
      console.log("test 2");
      // Determine the appropriate Mongoose model based on the collection name
      let ElementModel;
      switch (collectionName) {
        case "Account":
          ElementModel = Account;
          break;
        case "VerificationToken":
          ElementModel = VerificationToken;
          break;
        case "Movie":
          ElementModel = Movie;
          break;
        case "User":
          ElementModel = User;
          break;
        default:
          return res.status(404).json({ error: "Collection not found" });
      }

      // Check if the element exists
      const element = await ElementModel.findById(elementId);
      if (!element) {
        return res.status(404).json({ error: "Element not found" });
      }
      console.log("test 3");
      // Delete the element
      await ElementModel.findByIdAndDelete(elementId);

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting element");
    }
  }
);

router.put(
  "/api/update-element/:collectionName/:elementId",
  async (req, res) => {
    try {
      const { collectionName, elementId } = req.params;
      const updateData = req.body;

      // Check if the collection exists
      const availableCollections = [
        "Account",
        "VerificationToken",
        "Movie",
        "User",
      ];
      if (!availableCollections.includes(collectionName)) {
        return res.status(404).json({ error: "Collection not found" });
      }

      // Determine the appropriate Mongoose model based on the collection name
      let ElementModel;
      switch (collectionName) {
        case "Account":
          ElementModel = Account;
          break;
        case "VerificationToken":
          ElementModel = VerificationToken;
          break;
        case "Movie":
          ElementModel = Movie;
          break;
        case "User":
          ElementModel = User;
          break;
        default:
          return res.status(404).json({ error: "Collection not found" });
      }

      // Check if the element exists
      const element = await ElementModel.findById(elementId);
      if (!element) {
        return res.status(404).json({ error: "Element not found" });
      }

      // Update the element
      await ElementModel.findByIdAndUpdate(elementId, updateData);

      res.status(200).send("Element updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating element");
    }
  }
);
