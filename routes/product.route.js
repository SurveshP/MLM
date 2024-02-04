import express from 'express';
import * as productController from '../controllers/product.controller.js';
// const connectionController = require('./connection.controller');

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

// Search/filter products by categoryId
router.get('/searchProductsByCategoryId/:categoryId', productController.searchProductsByCategoryId);

// Search/filter products by price range
router.get('/searchProductsByPriceRange/:minPrice/:maxPrice', productController.searchProductsByPriceRange);

export default router;
