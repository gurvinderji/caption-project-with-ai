// import express framework for creating routes and handling HTTP requests
const express = require("express");

// import the register controller and login controller from auth.controller.js file because these controllers contain the logic for handling user registration and login functionalities
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller.js");

// router from express to define routes for user authentication
const router = express.Router();

// register route for user registration and token generation because when user sends a POST request to /register endpoint, the registerController function will be invoked to handle the registration process and it will create a new user and generate a token for the user

router.post("/register", registerController);

// login route for user login and token generation because when user sends a POST request to /login endpoint, the loginController function will be invoked to handle the login process and it will authenticate the user and generate a token for the user
router.post("/login", loginController);

module.exports = router;
