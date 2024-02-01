import express from 'express';
import * as userController from '../controllers/user.controller.js';
const router = express.Router();

// Add user
router.post('/userInsert', userController.userInsert);

// All users
router.get('/showAllUsers', userController.showAllUsers);

// Show user
router.get('/showUser/:sponsorId', userController.showUser);

// Show user from sponsorId
router.get('/showUser/fromSponsorId/:sponsorId', userController.showUserFromSponsorId);

// Update user
router.put('/updateUser/:sponsorId', userController.updateUser);

// Delete user
router.delete('/deleteUser/:sponsorId', userController.deleteUser);

export default router;
