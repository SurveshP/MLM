import express from 'express';
import * as planController from '../controllers/plan.controller.js';

const router = express.Router();

// add plan
router.post('/', planController.insertPlan);

// all plans
router.get('/', planController.ListPlans);

// all active plans
router.get('/active', planController.ListActivePlans);

// all inactive plans
router.get('/inactive', planController.ListInActivePlans);

// all inactive plans
router.put('/:id', planController.updatePlan);  // Activate Or Deactivate

// /* Delete */
router.delete('/:id', planController.deletePlan);

export default router;
