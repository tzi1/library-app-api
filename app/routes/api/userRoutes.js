/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UserController = require('../../controller/userController');
const userController = new UserController();

router.post('/recognize', function (req, res) {
    userController.recognizeUser(req, res);
});

/**
 * User Entity routes
 */
router.get('/:id/books', function(req, res){
  userController.findTakenBooks(req, res);
});

router.get('/count', function (req, res) {
    userController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    userController.exists(req, res);
});

router.get('/:id', function (req, res) {
    userController.findById(req, res);
});

router.get('/', function (req, res) {
    userController.findAll(res);
});

router.put('/:id', function (req, res) {
    userController.update(req, res);
});

router.post('/create', function (req, res) {
    userController.create(req, res);
});

router.delete('/:id', function (req, res) {
    userController.deleteById(req, res);
});

module.exports = router;