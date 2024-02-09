import express from 'express';
import * as topupsController from '../controllers/topups.controller.js';

const router = express.Router();

// Route for topups to respond to Topups request and update user's wallet
router.put('/:adminId/respond-Topups-request', topupsController.sendTopupsRequest);

// Reques Filter
router.get('/:adminId/requests/:requestStatus', topupsController.requestStatusFilter);

export default router;