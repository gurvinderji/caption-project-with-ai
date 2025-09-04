const express = require("express");
// import the auth middleware from auth.middleware.js file because this middleware is used to protect routes that require authentication
const authMidleware = require("../middlewares/auth.middleware.js");

// import the create post controller from post.controller.js file because this controller contains the logic for handling post creation functionality
const { createPostController } = require("../controllers/post.controller.js");

// multer for handling multipart/form-data, which is primarily used for uploading files
const multer = require("multer");

// configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/",
  authMidleware /*req.user = userData from auth middleware*/,
  upload.single("image"),
  createPostController
);

module.exports = router;
