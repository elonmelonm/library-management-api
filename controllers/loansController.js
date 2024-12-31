const Loan = require('../models/loan');
const Book = require('../models/book');

exports.createLoan = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Vérifier si l'utilisateur a déjà 3 emprunts actifs
        const activeLoans = await Loan.getLoansByUser(userId);
        const activeCount = activeLoans.filter(loan => loan.status === 'ACTIVE').length;
        if (activeCount >= 3) {
            return res.status(400).json({ error: 'User already has 3 active loans' });
        }

        // Vérifier la disponibilité du livre
        const book = await Book.getBookById(bookId);
        if (!book || book.availableQuantity <= 0) {
            return res.status(400).json({ error: 'Book not available for loan' });
        }

        // Créer un emprunt
        const loan = await Loan.createLoan({
            userId,
            bookId,
            borrowedAt: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 jours
            status: 'ACTIVE',
        });

        // Mettre à jour la disponibilité du livre
        await Book.updateBook(bookId, { availableQuantity: book.availableQuantity - 1 });

        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ error: 'Error creating loan' });
    }
};

exports.getUserLoans = async (req, res) => {
    try {
        const loans = await Loan.getLoansByUser(req.params.userId);
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user loans' });
    }
};

exports.returnLoan = async (req, res) => {
    try {
        const { id } = req.params;

        // Récupérer l'emprunt
        const loan = await Loan.returnLoan(id, new Date());
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        // Mettre à jour la disponibilité du livre
        const book = await Book.getBookById(loan.bookId);
        await Book.updateBook(loan.bookId, { availableQuantity: book.availableQuantity + 1 });

        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: 'Error returning loan' });
    }
};

exports.getOverdueLoans = async (req, res) => {
    try {
        const loans = await Loan.getOverdueLoans();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching overdue loans' });
    }
};
