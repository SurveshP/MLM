import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
// const connectionController = require('./connection.controller');

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

export default router;
