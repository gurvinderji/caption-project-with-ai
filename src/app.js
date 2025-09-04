const express = require("express");
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.routes.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// routes

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
