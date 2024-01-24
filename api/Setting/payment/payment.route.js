const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');

// add payment
router.post('/', paymentController.insertPayment);

// all payments
router.get('/', paymentController.ListPayments);

/* show */
router.get('/:id', paymentController.showPayment);

/* update */
router.put('/:id', paymentController.updatePayment);

/* Delete */
router.delete('/:id', paymentController.deletePayment);

module.exports = router;