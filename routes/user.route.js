import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';
// import SchemaValidator from "../middlewares/schemaValidator.js";
// const validateRequest = SchemaValidator(true);
const router = express.Router();

// Add user
// router.post('/userInsert', levelBasedLimit, userController.userInsert);
router.post('/userInsert', userController.userInsert);

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

// Request from user
router.get('/:adminId/withdraw-requests', userController.sendWithdrawRequest);

// Request from user
router.get('/:userId/orders', userController.getOrderListByUserId);

// Login user
router.post('/login', authController.userLogin);

// Logout user
router.post('/logout', authController.userLogout);

// Forget Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Change Password
router.post('/change-password/:userId', authController.changePassword);

export default router;
