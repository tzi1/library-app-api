/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const BookController = require('../../controller/bookController');
const bookController = new BookController();

/**
 * Book Entity routes
 */
router.get('/count', function (req, res) {
    bookController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    bookController.exists(req, res);
});

router.get('/:id', function (req, res) {
    bookController.findById(req, res);
});

router.get('/', function (req, res) {
    bookController.findAll(res);
});

router.put('/:id', function (req, res) {
    bookController.update(req, res);
});

router.post('/create', function (req, res) {
    bookController.create(req, res);
});

router.delete('/:id', function (req, res) {
    bookController.deleteById(req, res);
});

module.exports = router;