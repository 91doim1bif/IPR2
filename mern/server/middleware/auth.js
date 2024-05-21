const jwt = require("jsonwebtoken");

const JWT_SECRET = "JWT-SECRET"; // Directly embedding the secret for simplicity

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Assuming the decoded token has an `id` property
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = { verifyToken };
