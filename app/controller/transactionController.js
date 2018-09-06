/* Load Book Data Access Object */
const TransactionDao = require('../dao/transactionDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Book entity */
const Transaction = require('../model/transaction');

/**
 * Book Controller
 */
class TransactionController {

    constructor() {
        this.transactionDao = new TransactionDao();
        this.common = new ControllerCommon();
    }

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let transaction = new Transaction();
        if (req.body.userId) {
            transaction.userId = req.body.userId;
        }
        if (req.body.bookId) {
            transaction.bookId = req.body.bookId;
        }

        return this.transactionDao.takeBook(transaction)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

        // if (req.body.id) {
        //     return this.bookDao.createWithId(book)
        //         .then(this.common.editSuccess(res))
        //         .catch(this.common.serverError(res));
        // }
        // else {
        //     return this.bookDao.create(book)
        //         .then(this.common.editSuccess(res))
        //         .catch(this.common.serverError(res));
        // }
    };
}

module.exports = TransactionController;