const userModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  // get the token from the cookies
  const token = req.cookies.token;

  // if token is not present, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // if token is present, verify the token and get the user info
  try {
    // verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user by id from the decoded token and attach user info to request object
    const user = await userModel.findOne({ _id: decoded.userId });

    //its for next middleware or route handler to access the user info because we are attaching the user info to the request object
    req.user = user;
    next();
    // return the user info in the response
    res.status(200).json({ user });
  } catch (err) {
    // if token is invalid, return 401 Unauthorized
    // if token is invalid, return 401 Unauthorized
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authMiddleware;
