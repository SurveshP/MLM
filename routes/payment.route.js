import express from 'express';
import * as paymentController from '../controllers/payment.controller.js';

const router = express.Router();

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

export default router;
