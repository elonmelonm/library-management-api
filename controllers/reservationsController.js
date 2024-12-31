const Reservation = require('../models/reservation');
const Book = require('../models/book');

exports.createReservation = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Vérifier la disponibilité du livre
        const book = await Book.getBookById(bookId);
        if (!book || book.availableQuantity > 0) {
            return res.status(400).json({ error: 'Book is available, no need to reserve' });
        }

        // Créer une réservation
        const reservation = await Reservation.createReservation({
            userId,
            bookId,
            reservedAt: new Date(),
            status: 'PENDING',
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Error creating reservation' });
    }
};

exports.getReservationsForBook = async (req, res) => {
    try {
        const reservations = await Reservation.getReservationsByBook(req.params.bookId);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reservations' });
    }
};

exports.cancelReservation = async (req, res) => {
    try {
        const deleted = await Reservation.cancelReservation(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error cancelling reservation' });
    }
};
