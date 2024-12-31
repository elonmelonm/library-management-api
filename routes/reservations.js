const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

router.post('/', reservationsController.createReservation);
router.get('/book/:bookId', reservationsController.getReservationsForBook);
router.delete('/:id', reservationsController.cancelReservation);

module.exports = router;
