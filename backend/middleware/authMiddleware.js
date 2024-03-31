const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
