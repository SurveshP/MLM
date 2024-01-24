const express = require('express');
const router = express.Router();
const ordersController = require('./orders.controller');

// add orders
router.post('/', ordersController.insertOrders);

// all orderss
router.get('/', ordersController.ListOrders);

/* show */
router.get('/:id', ordersController.showOrders);

/* update */
router.put('/:id', ordersController.updateOrders);

/* Delete */
router.delete('/:id', ordersController.deleteOrders);

module.exports = router;