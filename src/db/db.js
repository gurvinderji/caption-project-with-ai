const mongoose = require("mongoose");

// function to connect to MongoDB database using mongoose because it establishes a connection to the database using the connection string provided in environment variables and it handles connection success and error events and it is called in server.js before starting the server to ensure that the database is connected before handling any incoming requests
function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

module.exports = connectDB;
