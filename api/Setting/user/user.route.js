const express = require('express');
const router = express.Router(); // access the method of route
const userController = require('./user.controller');

// add user
router.post('/', userController.userInsert);

// all users
router.get('/', userController.showUsers);

/* show */
router.get('/:sponserId', userController.showUser);

/* update */
router.put('/:sponserId', userController.updateUser);

/* Delete */
router.delete('/:sponserId', userController.deleteUser);

/* Wallet WithDrawal request */
router.post('/WithDrawalRequest/:sponserId', userController.WithDrawalRequest);

/* Wallet Add request */
router.post('/AddRequest/:sponserId', userController.AddRequest);
  

module.exports = router;