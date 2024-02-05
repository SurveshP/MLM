import express from 'express';
import * as userController from '../controllers/user.controller.js';
// import SchemaValidator from "../middlewares/schemaValidator.js";
// const validateRequest = SchemaValidator(true);
import { adminIdLimit } from '../middlewares/adminIdLimit.middleware.js'; // Import the middleware
const router = express.Router();

// Add user
router.post('/userInsert', adminIdLimit, userController.userInsert);

// All users
router.get('/showAllUsers', userController.showAllUsers);

// Show user
router.get('/showUser/:userId', userController.showUser);

// Show user from sponsorId
router.get('/showUser/fromAdminId/:adminId', userController.showUserDetailsByAdminId);

// Update user
router.put('/updateUser/:userId', userController.updateUser);

// Delete user
router.delete('/deleteUser/:userId', userController.deleteUser);

export default router;
