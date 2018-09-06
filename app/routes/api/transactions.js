const express = require('express');
const router = express.Router();

/* Load controller */
const TransactionController = require('../../controller/transactionController');
const transactionController = new TransactionController();

/**
 * Book Entity routes
 */
router.post('/takeBook', function (req, res) {
    transactionController.create(req, res);
});

router.post('/returnBook', function (req, res) {
    transactionController.return(req, res);
});

module.exports = router;