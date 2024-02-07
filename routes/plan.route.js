import express from 'express';
import * as planController from '../controllers/plan.controller.js';

const router = express.Router();

// add category
router.post('/', planController.insertPlan);

// all categorys
router.get('/', planController.insertPlan);

/* show */
// router.get('/:id', planController.showCategory);

// /* update */
// router.put('/:id', planController.updateCategory);

// /* Delete */
// router.delete('/:id', planController.deleteCategory);

export default router;
