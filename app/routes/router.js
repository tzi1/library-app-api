/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/user', require('./api/userRoutes'));
router.use('/book', require('./api/bookRoutes'));
router.use('/transaction', require('./api/transactions'));

module.exports = router;