/// dotenv file is used to load environment variables from a .env file into process.env in Node.js application because it helps to manage configuration settings and sensitive information like database connection strings and API keys separately from the source code
require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");

// connect to the database before starting the server
connectDB();

// start the server and listen on port 3000 for incoming requests
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
