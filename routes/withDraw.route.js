import express from 'express';
import * as withDrawController from '../controllers/withDraw.controller.js';

const router = express.Router();

// userId requests
router.get('/withdrawal-requests/:userId', withDrawController.viewWithdrawRequests);

// all requests
router.get('/withdraws', withDrawController.getAllWithdrawRequests);

export default router;