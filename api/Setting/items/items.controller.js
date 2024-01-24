const ItemsModel = require('./items.model');
const { validateItems, validateUpdate } = require('./items.validator');
const CompanyModel  = require("../company/company.model");
const ItemCategoriesModel  = require("../itemsCategories/itemsCategories.model");

// Insert New items
exports.insertItems = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateItems(req.body);
    
    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if ItemName already exists
    const existingItemName = await UserModel.findOne({ itemName: value.itemName });
    if (existingItemName) {
      return res.status(400).json({ error: 'Item with the given name already exists' });
    }
    
    // Insert items
    let itemsModel = new ItemsModel(value);
    let savedItems = await itemsModel.save();

    // Update company with item_id
    const companyId = req.body.company_id; // Assuming you pass company_id in the request body
    if (companyId) {
      await CompanyModel.findByIdAndUpdate(companyId, { $push: { item_id: savedItems._id } });
    }

    // Update itemCategories with item_id
    const itemCategoriesId = req.body.itemCategories_id; // Assuming you pass itemCategories_id in the request body
    if (itemCategoriesId) {
      await ItemCategoriesModel.findByIdAndUpdate(itemCategoriesId, { $push: { item_id: savedItems._id } });
    }

    // Send Response
    res.status(200).json({ message: 'Items data inserted', data: savedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting items data into the database' });
  }
};

// Display List
exports.ListItemss = async (req, res, next) => {
  try {
    let items = await ItemsModel.find({ del_status: "Live" });
    if (!items || items.length === 0) {
      console.log('itemsr not found');
      return res.status(404).json({ message: 'items not found' });
    }
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display Single items
exports.showItems = async (req, res, next) => {
  try {
    let id = req.params.id;
    let items = await ItemsModel.findOne({ _id: id });

    if (!items) {
      console.log('items not found');
      return res.status(404).json({ message: 'items not found' });
    }

    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update items
exports.updateItems = async (req, res, next) => {
  try {
    let id = req.params.id;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let items = await ItemsModel.findByIdAndUpdate({ _id: id }, value, {
      new: true
    });

    if (!items) {
      console.log('items not found');
      return res.status(404).json({ message: 'items not found' });
    }

    res.status(200).json({ items });
  } catch (error) {

    console.log(error);
    // Send Error Response
    res.status(500).json('Error updating items');
  }
};

// // Delete items
exports.deleteItems = async (req, res, next) => {
  try {
    let id = req.params.id;

    const updatedItems = await ItemsModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
      { new: true }
    );

    if (!updatedItems) {
      console.log('items not found');
      return res.status(404).json({ message: 'items not found' });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
