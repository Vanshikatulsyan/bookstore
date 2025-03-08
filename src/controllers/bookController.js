const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  const { page = 1, limit = 10, genre, rating } = req.query;
  const filter = {};
  if (genre) filter.genre = genre;
  if (rating) filter.rating = { $gte: parseFloat(rating) };
  try {
    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(books);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
};

const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getAllBooks, getBookById, addBook };
