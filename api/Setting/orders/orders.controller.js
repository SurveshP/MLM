const OrdersModel = require('./orders.model');
const { validateOrders, validateUpdate } = require('./orders.validator');
const ItemsModel  = require("../items/items.model");
const UserModel  = require("../user/user.model");

// Insert New orders
exports.insertOrders = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateOrders(req.body);
    
    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Insert orders
    let ordersModel = new OrdersModel(value);
    let savedOrders = await ordersModel.save();

    // Update company with item_id
    const itemsId = req.body.items_id; // Assuming you pass company_id in the request body
    if (itemsId) {
      await CompanyModel.findByIdAndUpdate(itemsId, { $push: { order_id: savedOrders._id } });
    }

    // Update itemCategories with item_id
    const userId = req.body.itemCategories_id; // Assuming you pass itemCategories_id in the request body
    if (userId) {
      await ItemCategoriesModel.findByIdAndUpdate(userId, { $push: { order_id: savedOrders._id } });
    }

    // Send Response
    res.status(200).json({ message: 'Orders data inserted', data: savedOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting orders data into the database' });
  }
};

// Display List
exports.ListOrders = async (req, res, next) => {
  try {
    let orders = await OrdersModel.find({ del_status: "Live" });
    if (!orders || orders.length === 0) {
      console.log('ordersr not found');
      return res.status(404).json({ message: 'orders not found' });
    }
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display Single orders
exports.showOrders = async (req, res, next) => {
  try {
    let id = req.params.id;
    let orders = await OrdersModel.findOne({ _id: id });

    if (!orders) {
      console.log('orders not found');
      return res.status(404).json({ message: 'orders not found' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update orders
exports.updateOrders = async (req, res, next) => {
  try {
    let id = req.params.id;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let orders = await OrdersModel.findByIdAndUpdate({ _id: id }, value, {
      new: true
    });

    if (!orders) {
      console.log('orders not found');
      return res.status(404).json({ message: 'orders not found' });
    }

    res.status(200).json({ orders });
  } catch (error) {

    console.log(error);
    // Send Error Response
    res.status(500).json('Error updating orders');
  }
};

// // Delete orders
exports.deleteOrders = async (req, res, next) => {
  try {
    let id = req.params.id;

    const updatedOrders = await OrdersModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
      { new: true }
    );

    if (!updatedOrders) {
      console.log('orders not found');
      return res.status(404).json({ message: 'orders not found' });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
