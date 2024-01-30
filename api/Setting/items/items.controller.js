const ItemsModel = require('./items.model');
const { validateItems, validateUpdate } = require('./items.validator');
const ItemsCategoriesModel  = require("../itemsCategories/itemsCategories.model");
const ItemCategoriesModel  = require("../itemsCategories/itemsCategories.model");

function generateSponsorId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, '0');
  return `ITM-${formattedCount}`;
}

// Insert New items
exports.insertItems = async (req, res, next) => {
  try {
    // Validation
    let { error, value } = validateItems(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if emailAddress already exists
    const existingItemsName = await ItemsModel.findOne({ itemName: value.itemName });
    if (existingItemsName) {
      return res.status(400).json({ error: 'Items with the given itemName already exists' });
    }

    // Generate sponsorId
    const count = await ItemsModel.countDocuments() + 1; // Get the count of existing documents
    const sponsorId = generateSponsorId(count);

    // Insert Items with sponsorId
    value.sponserId = sponsorId;
    let itemsModel = new ItemsModel(value);
    let savedItems = await itemsModel.save();

    // Update itemsCategories with itemsSponser_id
    const itemsCategoriesId = req.body.itemsCategories_id; // Assuming you pass itemsCategories_id in the request body
    if (itemsCategoriesId) {
      // Create a filter object using the itemsCategoriesId
      const filter = { _id: itemsCategoriesId };

      // Push the items's sponsorId into the itemsSponser_id array of the itemsCategories
      await ItemsCategoriesModel.findOneAndUpdate(filter, { $push: { itemsSponser_id: savedItems.sponserId } });
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

    res.status(200).json({ message: "Items deleted successfully" });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
