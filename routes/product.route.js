import express from 'express';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

// add product
router.post('/', productController.insertProduct);

// all products
router.get('/', productController.ListProducts);

/* show */
router.get('/:itemId', productController.showProduct);

/* update */
router.put('/:itemId', productController.updateProduct);

/* Delete */
router.delete('/:itemId', productController.deleteProduct);

export default router;
