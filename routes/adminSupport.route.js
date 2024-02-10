import express from 'express';
import * as adminSupportController from '../controllers/adminSupport.controller.js';

const router = express.Router();

// all requests
router.get('/:adminId/requestList', adminSupportController.viewAdminSupportRequests);

// Route to send admin support request
router.put('/reply', adminSupportController.replyToSupportRequest);

export default router;