const express = require('express');
const router = express.Router();
const itemsController = require('./items.controller');

// add items
router.post('/', itemsController.insertItems);

// all itemss
router.get('/', itemsController.ListItemss);

/* show */
router.get('/:id', itemsController.showItems);

/* update */
router.put('/:id', itemsController.updateItems);

/* Delete */
router.delete('/:id', itemsController.deleteItems);

module.exports = router;