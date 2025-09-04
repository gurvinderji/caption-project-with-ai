const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },

  caption: { type: String },

  // reference to the user who created the post
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

// const postSchema = new mongoose.Schema({
//   title: { type: String },
//   content: { type: String },
// );

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
