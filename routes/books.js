const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);
router.get('/search', booksController.searchBooks);

module.exports = router;
