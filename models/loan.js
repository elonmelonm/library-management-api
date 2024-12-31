const db = require('../utils/database');

class Loan {
    static createLoan(data) {
        return db('loans').insert(data).returning('*');
    }

    static getLoansByUser(userId) {
        return db('loans').where({ userId }).orderBy('borrowedAt', 'desc');
    }

    static returnLoan(id, returnedAt) {
        return db('loans')
            .where({ id })
            .update({ status: 'RETURNED', returnedAt })
            .returning('*');
    }

    static getOverdueLoans() {
        return db('loans')
            .where('dueDate', '<', new Date())
            .andWhere({ status: 'ACTIVE' })
            .orderBy('dueDate', 'asc');
    }
}

module.exports = Loan;
