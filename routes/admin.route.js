import express from 'express';
import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

// add admin
router.post('/', adminController.insertAdmin);

// all admins
router.get('/', adminController.ListAdmins);

/* show */
router.get('/:sponsorId', adminController.showAdmin);

/* update */
router.put('/:sponsorId', adminController.updateAdmin);

/* Delete */
router.delete('/:sponsorId', adminController.deleteAdmin);

export default router;
