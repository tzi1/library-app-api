const express = require('express');
const router = express.Router();

/* Load controller */
const TransactionController = require('../../controller/transactionController');
const transactionController = new TransactionController();

/**
 * Book Entity routes
 */
router.post('/create', function (req, res) {
    transactionController.create(req, res);
});

module.exports = router;