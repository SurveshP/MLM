import express from 'express';
import * as supportController from '../controllers/support.controller.js';

const router = express.Router();

// add support
router.post('/:adminId', supportController.insertSupport);

// all supports
router.get('/', supportController.ListSupports);

/* show */
router.get('/:id', supportController.showSupport);

/* update */
router.put('/:id', supportController.updateSupport);

/* Delete */
router.delete('/:id', supportController.deleteSupport);

export default router;
