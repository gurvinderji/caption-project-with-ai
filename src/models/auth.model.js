// this file defines the user schema and model for authentication using mongoose

const mongoose = require("mongoose");

// user schema defines the structure of user documents in MongoDB database because it specifies the fields and their data types for user collection in the database and it ensures that each user document has a unique username and a password
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// user model is created using the user schema because it provides an interface for interacting with the user collection in the database and it allows us to perform CRUD operations on user documents and userModel is used in the auth controller to create new users and find existing users during registration and login processes
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
