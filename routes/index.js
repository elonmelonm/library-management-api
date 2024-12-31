const express = require('express');
const booksRoutes = require('./books');
const loansRoutes = require('./loans');
const reservationsRoutes = require('./reservations');

const router = express.Router();

// Routes pour la gestion des livres
router.use('/api/books', booksRoutes);

// Routes pour la gestion des emprunts
router.use('/api/loans', loansRoutes);

// Routes pour la gestion des réservations
router.use('/api/reservations', reservationsRoutes);

module.exports = router;
