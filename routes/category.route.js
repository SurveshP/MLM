import express from 'express';
import * as categoryController from '../controllers/category.controller.js';

const router = express.Router();

// add category
router.post('/', categoryController.insertCategory);

// all categorys
router.get('/', categoryController.ListCategorys);

/* show */
router.get('/:id', categoryController.showCategory);

/* update */
router.put('/:id', categoryController.updateCategory);

/* Delete */
router.delete('/:id', categoryController.deleteCategory);

export default router;
