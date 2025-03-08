const express = require("express");
const {
  getAllBooks,
  getBookById,
  addBook,
} = require("../controllers/bookController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", authenticate, isAdmin, addBook);

module.exports = router;
