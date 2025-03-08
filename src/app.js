const express = require("express");
const connectDB = require("./config/db"); // Import MongoDB connection
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB(); // Connect to MongoDB
//app.set("view engine","ejs")
app.use("/books", require("./routes/bookRoutes"));
app.use("/users", require("./routes/userRoutes"));

module.exports = app;
