//postModel is imported to interact with the database and perform CRUD operations on the posts collection
const postModel = require("../models/post.model.js");

// generateCaption function is imported from ai.service.js file to generate captions for the uploaded images using AI
const generateCaption = require("../service/ai.service.js");

// create post controller for creating a new post because when user sends a POST request to /posts endpoint, this function will be invoked to handle the post creation process and it will create a new post in the database

async function createPostController(req, res) {
  // get the file from the request object because multer middleware is used to handle file uploads and it attaches the uploaded file to the request object
  const file = req.file;

  console.log("file received:", file);
  const base64Image = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(base64Image);
  res.json({ caption });
}
module.exports = { createPostController };
