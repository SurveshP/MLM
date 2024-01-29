const express = require('express');
const router = express.Router(); // access the method of route
const userController = require('./user.controller');

// add user
router.post('/', userController.userInsert);

// add connection
// router.post('/connect', userController.insertConnection);

// all users
router.get('/', userController.showUsers);

/* show */
router.get('/:sponserId', userController.showUser);

/* show */
router.get('/fromSponsorId/:sponserId', userController.showUserFromSponsorId);

/* update */
router.put('/:sponserId', userController.updateUser);

/* Delete */
router.delete('/:sponserId', userController.deleteUser);

module.exports = router;