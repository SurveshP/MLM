import express from 'express';
import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

// add admin
router.post('/', adminController.insertAdmin);

// all admins
router.get('/', adminController.ListAdmins);

/* show */
router.get('/:adminId', adminController.showAdmin);

/* update */
router.put('/:adminId', adminController.updateAdmin);

/* Delete */
router.delete('/:adminId', adminController.deleteAdmin);

// Count userId associated with an admin
router.get('/countUserId/:adminId', adminController.countUserId);

// all requests
router.get('/:adminId/withdrawal-requests', adminController.viewWithdrawRequests);

// Route for admin to respond to withdraw request and update user's wallet
router.post('/:adminId/respond-withdraw-request', adminController.sendWithdrawRequest);
export default router;
