// auth user model for database operations
const userModel = require("../models/auth.model.js");
// jwt for token generation
const jwt = require("jsonwebtoken");

// bcrypt for password hashing because storing plain text passwords is insecure
const bcrypt = require("bcrypt");

// register controller for user registration and token generation because when user sends a POST request to /register endpoint, this function will be invoked to handle the registration process and it will create a new user and generate a token for the user

async function registerController(req, res) {
  // Extract username and password from request body
  const { username, password } = req.body;
  // Check if the username already exists
  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }
  // Create a new user
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  // token generation
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // Set the token in cookie
  res.cookie("token", token);

  res.status(201).json({ message: "User registered successfully", user });
}

// login controller for user login and token generation because when user sends a POST request to /login endpoint, this function will be invoked to handle the login process and it will authenticate the user and generate a token for the user
async function loginController(req, res) {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Find the user by username
  const user = await userModel.findOne({ username });

  // If user not found, return error
  if (!user) {
    res.status(401).json({ message: "user not found" });
  }

  // Check if the password is correct
  //   const isPasswordValid = user.password === password;
  // replaced with bcrypt for secure password comparison because passwords are hashed before storing in database and bcrypt provides a secure way to compare hashed passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If password is incorrect, return error and do not generate token
  if (!isPasswordValid) {
    res.status(401).json({ message: "invalid password" });
  }
  // If user is found and password is correct, proceed to generate token for authentication because token is used for session management and to authenticate user in future requests
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // Set the token in cookie for session management and authentication
  res.cookie("token", token);

  // Return success response with user details (excluding password) because password is sensitive information
  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.username,
      id: user._id,
    },
  });
}

// export the register controller  and  login controller so that it can be used in routes because routes are responsible for handling incoming requests and directing them to the appropriate controller functions for processing
module.exports = { registerController, loginController };
