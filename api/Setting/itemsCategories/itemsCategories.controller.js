const ItemsCategoriesModel = require('./itemsCategories.model');
const { validateItemsCategories, validateUpdate } = require('./itemsCategories.validator');

// Insert New itemsCategories
// exports.insertItemsCategories = async (req, res, next) => {
//   try {
//     // Validation
//     const { error, value } = validateItemsCategories(req.body);
    
//     // Check Error in Validation
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
    
//     // Insert itemsCategories
//     let itemsCategoriesModel = new ItemsCategoriesModel(value);
//     let savedItemsCategories = await itemsCategoriesModel.save();

//     // Send Response
//     res.status(200).json({ message: 'ItemsCategories data inserted', data: savedItemsCategories });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting itemsCategories data into the database' });
//   }
// };
exports.insertItemsCategories = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateItemsCategories(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if itemCategoryName already exists
    const existingItem = await ItemsCategoriesModel.findOne({ itemCategoryName: value.itemCategoryName });
    if (existingItem) {
      return res.status(400).json({ error: 'ItemCategory with the given name already exists' });
    }

    // Insert itemsCategories
    let itemsCategoriesModel = new ItemsCategoriesModel(value);
    let savedItemsCategories = await itemsCategoriesModel.save();

    // Send Response
    res.status(200).json({ message: 'ItemsCategories data inserted', data: savedItemsCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting itemsCategories data into the database' });
  }
};


// Display List
exports.ListItemsCategoriess = async (req, res, next) => {
  try {
    let itemsCategories = await ItemsCategoriesModel.find({ del_status: "Live" });
    if (!itemsCategories || itemsCategories.length === 0) {
      console.log('itemsCategoriesr not found');
      return res.status(404).json({ message: 'itemsCategories not found' });
    }
    res.status(200).json({ itemsCategories });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display Single itemsCategories
exports.showItemsCategories = async (req, res, next) => {
  try {
    let id = req.params.id;
    let itemsCategories = await ItemsCategoriesModel.findOne({ _id: id });

    if (!itemsCategories) {
      console.log('itemsCategories not found');
      return res.status(404).json({ message: 'itemsCategories not found' });
    }

    res.status(200).json({ itemsCategories });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update itemsCategories
exports.updateItemsCategories = async (req, res, next) => {
  try {
    let id = req.params.id;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let itemsCategories = await ItemsCategoriesModel.findByIdAndUpdate({ _id: id }, value, {
      new: true
    });

    if (!itemsCategories) {
      console.log('itemsCategories not found');
      return res.status(404).json({ message: 'itemsCategories not found' });
    }

    res.status(200).json({ itemsCategories });
  } catch (error) {

    console.log(error);
    // Send Error Response
    res.status(500).json('Error updating itemsCategories');
  }
};

// // Delete itemsCategories
exports.deleteItemsCategories = async (req, res, next) => {
  try {
    let id = req.params.id;

    const updatedItemsCategories = await ItemsCategoriesModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
      { new: true }
    );

    if (!updatedItemsCategories) {
      console.log('itemsCategories not found');
      return res.status(404).json({ message: 'itemsCategories not found' });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
