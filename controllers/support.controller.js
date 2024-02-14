import SupportModel from '../models/support.model.js';
import AdminSupportModel from "../models/adminSupport.model.js";
import { nanoid } from 'nanoid';

export async function insertSupport(req, res) {
  try {
    const { userId, description } = req.body;
    const adminId = req.params.adminId; // Extract adminId from URL
    
    // Generate ticketToken
    const ticketToken = `TK${nanoid(8)}`;

    // Create a new support request
    const newSupport = new SupportModel({
      userId: userId,
      ticketToken: ticketToken,
      description: description,
      requestStatus: 'Not Replied' // Assuming this field should be set to 'Not Replied' initially
    });

    // Save the support request to the database
    await newSupport.save();

    // Create a new admin support entry
    const adminSupport = new AdminSupportModel({
      adminId: adminId,
      userId: userId,
      ticketToken: ticketToken,
      description: description,
      requestStatus: 'Pending'
    });

    // Save the admin support entry to the database
    await adminSupport.save();

    res.status(200).json({ message: "Support data inserted successfully" });
  } catch (error) {
    console.error("Error in insertSupport:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

// Display List
export async function  ListSupports(req, res, next){
  try {
    let support = await SupportModel.find();
    if (!support || support.length === 0) {
      console.log('supportr not found');
      return res.status(404).json({ message: 'support not found' });
    }
    res.status(200).json({ message: "success", support });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single support
export async function  showSupport(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is supportId
    let support = await SupportModel.findOne({_id: id});

    if (!support) {
      console.log('Support not found');
      return res.status(404).json({ message: 'Support not found' });
    }

    res.status(200).json({ support });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving support' });
  }
};

// Update support
export async function updateSupport(req, res, next) {
  try {
    const id = req.params.id;
    const supportDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateSupport(supportDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing support by ID using Mongoose
    const existingSupport = await SupportModel.findOne({ _id: id });

    if (!existingSupport) {
      return res.status(404).json({ message: 'Support not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingSupport, supportDataToUpdate);

    // Save the updated support
    const updatedSupport = await existingSupport.save();

    // Send the updated support as JSON response
    res.status(200).json({ message: 'Support updated successfully', support: updatedSupport });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete support
export async function  deleteSupport(req, res, next){
  try {
    let id = req.params.id;

    const updatedSupport = await SupportModel.deleteOne(
      { _id: id },
      { new: true }
    );

    if (!updatedSupport) {
      return res.status(404).json({ message: "Support not found." });
    }

    res.status(200).json({ message: "Support deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};