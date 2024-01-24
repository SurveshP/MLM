const express = require('express');
const router = express.Router();
const itemsCategoriesController = require('./itemsCategories.controller');

// add itemsCategories
router.post('/', itemsCategoriesController.insertItemsCategories);

// all itemsCategoriess
router.get('/', itemsCategoriesController.ListItemsCategoriess);

/* show */
router.get('/:id', itemsCategoriesController.showItemsCategories);

/* update */
router.put('/:id', itemsCategoriesController.updateItemsCategories);

/* Delete */
router.delete('/:id', itemsCategoriesController.deleteItemsCategories);

module.exports = router;