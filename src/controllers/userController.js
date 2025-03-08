const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User created");
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("User not found");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.header("Authorization", token).json({ token });
};

module.exports = { signup, login };
