const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, isbn, quantity } = req.body;
        const newBook = await Book.createBook({ title, author, isbn, quantity, availableQuantity: quantity });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error creating book' });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { title, author, isbn, quantity } = req.body;
        const updatedBook = await Book.updateBook(req.params.id, { title, author, isbn, quantity, availableQuantity: quantity });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.deleteBook(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const books = await Book.searchBooks(req.query.query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error searching books' });
    }
};
