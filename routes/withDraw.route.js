import express from 'express';
import * as withDrawController from '../controllers/withDraw.controller.js';

const router = express.Router();

// all requests
router.get('/:adminId/withdrawal-requests', withDrawController.viewWithdrawRequests);

export default router;