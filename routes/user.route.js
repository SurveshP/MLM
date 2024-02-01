import express from 'express';
import * as userController from '../controllers/user.controller.js';
import SchemaValidator from "../middlewares/schemaValidator.js";
const validateRequest = SchemaValidator(true);
const router = express.Router();

// Add user
router.post('/userInsert', validateRequest, userController.userInsert);

// All users
router.get('/showAllUsers', userController.showAllUsers);

// Show user
router.get('/showUser/:sponserId', userController.showUser);

// Show user from sponsorId
router.get('/fromSponsorId/:sponserId', userController.showUserFromSponsorId);

// Update user
router.put('/updateUser/:sponserId', userController.updateUser);

// Delete user
router.delete('/deleteUser/:sponserId', userController.deleteUser);

export default router;
