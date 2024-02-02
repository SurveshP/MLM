import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import { validateCreateOrder, validateUpdateOrder } from '../validators/order.validator.js';

function generateOrderId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, '0');
  return `ORD-${formattedCount}`;
}

// Insert New order
// export async function insertOrder(req, res) {
//   try {
//     const orderData = req.body;

//     // Validate order data before insertion
//     const { error } = validateCreateOrder(orderData);
//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     // Generate orderId
//     const count = (await OrderModel.countDocuments()) + 1; // Get the count of existing documents
//     const orderId = generateOrderId(count);

//     // Insert Order with orderId
//     const newOrder = new OrderModel(orderData);
//     newOrder.orderId = orderId;
//     const savedOrder = await newOrder.save();

//     // if (orderData.order_id) {
//     //   // Create a filter object using the orderId
//     //   const filter = { _id: orderData.order_id };

//     //   // Push the order's orderId into the orderSponsor_id array of the order
//     //   await OrderModel.findOneAndUpdate(filter, {
//     //     $push: { orderSponser_id: savedOrder.orderId },
//     //   });
//     // }

//     // Send Response
//     res.status(200).json({ message: "Order data inserted", data: savedOrder });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: error.message || "Something went wrong",
//       });
//   }
// };
export async function insertOrder(req, res) {
  try {
    const orderData = req.body;

    // Validate order data before insertion
    const { error } = validateCreateOrder(orderData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Generate orderId
    const count = (await OrderModel.countDocuments()) + 1; // Get the count of existing documents
    const orderId = generateOrderId(count);

    // Insert Order with orderId
    const newOrder = new OrderModel(orderData);
    newOrder.orderId = orderId;
    const savedOrder = await newOrder.save();

    // Check if orderStatus is 'Delivered'
    if (orderData.orderStatus === 'Delivered') {
      // Update user with userId
      const userId = orderData.userId; // Assuming you pass userId in the request body
      if (userId) {
        // Find the user by userId
        const user = await UserModel.findOne({ userId: userId });
        if (user) {
          // Push orderId to the user's orderId array
          user.orderId.push(orderId);
          // Save the user
          await user.save();
        } else {
          throw new Error("User not found");
        }
      }
    }

    // Send Response
    res.status(200).json({ message: "Order data inserted", data: savedOrder });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
}

// Display List
export async function ListOrders(req, res, next) {
  try {
    let order = await OrderModel.find({ disabled: "false" });
    if (!order || order.length === 0) {
      console.log('orderr not found');
      return res.status(404).json({ message: 'order not found' });
    }
    res.status(200).json({ message: "success", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single order
export async function showOrder(req, res, next) {
  try {
    let orderId = req.params.orderId; // Assuming the parameter is orderId
    let order = await OrderModel.findOne({ orderId: orderId });

    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving order' });
  }
};

// Update order
export async function updateOrder(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const orderDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateOrder(orderDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing order by ID using Mongoose
    const existingOrder = await OrderModel.findOne({ orderId: orderId });

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingOrder, orderDataToUpdate);

    // Save the updated order
    const updatedOrder = await existingOrder.save();

    // Check if orderStatus is 'Delivered'
    if (existingOrder.orderStatus === 'Delivered') {
      // Update user with userId
      const userId = existingOrder.userId; // Assuming you pass userId in the request body
      if (userId) {
        // Find the user by userId
        const user = await UserModel.findOne({ userId: userId });
        if (user) {
          // Push orderId to the user's orderId array
          user.orderId.push(orderId);
          // Save the user
          await user.save();
        } else {
          throw new Error("User not found");
        }
      }
    }

    // Send the updated order as JSON response
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete order
export async function deleteOrder(req, res, next) {
  try {
    let orderId = req.params.orderId;

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { orderId: orderId },
      { disabled: "true" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
