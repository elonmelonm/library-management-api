const db = require('../utils/database');

class Reservation {
    static createReservation(data) {
        return db('reservations').insert(data).returning('*');
    }

    static getReservationsByBook(bookId) {
        return db('reservations').where({ bookId }).orderBy('reservedAt', 'asc');
    }

    static cancelReservation(id) {
        return db('reservations').where({ id }).del();
    }
}

module.exports = Reservation;
