const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

// all requests
router.get('/', adminController.ListRequests);

module.exports = router;