const express = require('express');
const router = express.Router();
const connectionController = require('./connection.controller');

// add connection
router.post('/', connectionController.insertConnection);

// all connections
router.get('/', connectionController.ListConnections);

/* show */
router.get('/:sponserId', connectionController.showConnection);

/* update */
router.put('/:sponserId', connectionController.updateConnection);

/* Delete */
router.delete('/:sponserId', connectionController.deleteConnection);

module.exports = router;