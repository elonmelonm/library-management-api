const db = require('../utils/database');

class Book {
    static getAllBooks() {
        return db('books').select('*');
    }

    static getBookById(id) {
        return db('books').where({ id }).first();
    }

    static createBook(data) {
        return db('books').insert(data).returning('*');
    }

    static updateBook(id, data) {
        return db('books').where({ id }).update(data).returning('*');
    }

    static deleteBook(id) {
        return db('books').where({ id }).del();
    }

    static searchBooks(query) {
        return db('books').whereILike('title', `%${query}%`).orWhereILike('author', `%${query}%`);
    }
}

module.exports = Book;
