/* Load Book entity */
const Book = require('../model/transaction');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Book Data Access Object
 */
class TransactionDao {

    constructor() {
        this.common = new daoCommon();
    }

    takeBook(transaction) {
        console.log(transaction);
        let sqlRequest = "INSERT into `transaction` (userId, bookId, takenAt) " +
            "VALUES ($bookId, $userId, $takenAt)";
        let sqlParams = {
            $userId: transaction.userId,
            $bookId: transaction.bookId,
            $takenAt: new Date().toISOString()

        };
        return this.common.run(sqlRequest, sqlParams);
    }
}

module.exports = TransactionDao;