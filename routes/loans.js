const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');

router.post('/', loansController.createLoan);
router.get('/user/:userId', loansController.getUserLoans);
router.put('/:id/return', loansController.returnLoan);
router.get('/overdue', loansController.getOverdueLoans);

module.exports = router;
