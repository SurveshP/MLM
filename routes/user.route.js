import express from 'express';
import * as userController from '../controllers/user.controller.js';
const router = express.Router();

// Add user
router.post('/userInsert', userController.userInsert);

// All users
router.get('/showAllUsers', userController.showAllUsers);

// Show user
router.get('/showUser/:userId', userController.showUser);

// Show user from sponsorId
router.get('/showUser/fromuserId/:userId', userController.showUserFromuserId);

// Update user
router.put('/updateUser/:userId', userController.updateUser);

// Delete user
router.delete('/deleteUser/:userId', userController.deleteUser);

// Search/filter users by userName
router.get('/searchUser/:userName', userController.searchUsersByUserName);

export default router;
