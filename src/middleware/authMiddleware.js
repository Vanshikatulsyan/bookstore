const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  next();
};

module.exports = { authenticate, isAdmin };
