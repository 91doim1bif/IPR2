// Filename - backend/index.js

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3080;

const uri = "mongodb://localhost:27017/test";
const dbName = "sample_mflix";
var database;
var client = new MongoClient(uri);
const DATABASE_NAME = "sample_mflix";

/*
app.listen(PORT, () => {
  client = new MongoClient(uri);
  database=client.db(dbName);
  console.log("Mongo DB Connection Successful");
});
*/

app.listen(PORT, () => {
  console.log(`it is listening to the port ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collections = await database.listCollections().toArray(); // Use listCollections() to list collections
    collections.forEach((collection) => console.log(collection.name)); // Use collection.name to get collection name
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  res.send("App is Working");
});

app.get("/api/users", async (req, res) => {
  try {
    await client.connect();
    database = client.db("sample_mflix");
    console.log("test");
    results = await database.collection("users").find({}).toArray();
    res.send(results);
  } catch (e) {
    console.error(e);
  }
});

// This section will help you create a new user record.
app.post("/api/signup", async (req, res) => {
  try {
    let newUser = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    };

    console.log("New User:", newUser); // Log newUser object for debugging

    await client.connect();
    database = client.db("sample_mflix");
    const collection = database.collection("users");

    const existingUser = await collection.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const result = await collection.insertOne(newUser);

    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  } finally {
    await client.close(); // Close the MongoDB client connection
  }
});

// Sign-in endpoint
app.post("/api/signin", async (req, res) => {
  try {
    await client.connect();
    const database = client.db(DATABASE_NAME);
    const collection = database.collection("users");

    const { name, password } = req.body;

    // Find user by email
    const user = await collection.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing in");
  } finally {
    await client.close();
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    console.log("should be delete now " + req.params.id);
    const query = { _id: new ObjectId(req.params.id) };

    await client.connect();
    database = client.db("sample_mflix");
    const collection = database.collection("users");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 1) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collections = await database.listCollections().toArray(); // Use listCollections() to list collections
    collections.forEach((collection) => console.log(collection.name)); // Use collection.name to get collection name
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

/*

app.post('/register', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('users');
    
    const user = req.body;
    const result = await collection.insertOne(user);
    
    if (result.insertedCount > 0) {
      delete user.password;
      res.json(user);
      console.log(user);
    } else {
      console.log('User already registered');
      res.status(400).send('User already registered');
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Something Went Wrong');
  } finally {
    await client.close();
  }
});

*/
