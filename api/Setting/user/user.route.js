const express = require('express');
const router = express.Router(); // access the method of route
const userController = require('./user.controller');

// add user
router.post('/', userController.userInsert);

// all users
router.get('/', userController.showUsers);

/* show */
router.get('/:id', userController.showUser);

/* update */
router.put('/:id', userController.updateUser);

/* Delete */
router.delete('/:id', userController.deleteUser);

module.exports = router;