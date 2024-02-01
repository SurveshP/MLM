import express from 'express';
import * as orderController from '../controllers/order.controller.js';

const router = express.Router();

// add order
router.post('/', orderController.insertOrder);

// all orders
router.get('/', orderController.ListOrders);

/* show */
router.get('/:orderId', orderController.showOrder);

/* update */
router.put('/:orderId', orderController.updateOrder);

/* Delete */
router.delete('/:orderId', orderController.deleteOrder);

export default router;
