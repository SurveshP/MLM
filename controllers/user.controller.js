import UserModel from "../models/user.model.js";
import AdminModel from "../models/admin.model.js";
import { validateCreateUser, validateUpdateUser } from '../validators/user.validator.js';
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Function to generate user IDs
function generateuserId(count) {
  const formattedCount = count.toString().padStart(2, "0");
  return `USE-${formattedCount}`;
}

export async function userInsert(req, res) {
  try {
    const userData = req.body;

    // Validate user data before insertion
    const { error } = validateCreateUser(userData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if emailAddress already exists in UserModel
    const existingUser = await UserModel.findOne({
      emailAddress: userData.emailAddress,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with the given emailAddress already exists" });
    }

    // Generate userId
    const userCount = (await UserModel.countDocuments()) + 1;
    const userId = generateuserId(userCount);

    // Replace the plain password with the hashed one
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Insert User with userId
    const newUser = new UserModel({
      ...userData,
      userId: userId,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Send Response
    res.status(200).json({
      message: "User data inserted",
      userData: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}


// User List
export async function showAllUsers(req, res) {
  try {
    const user = await UserModel.find({ disabled: "false" });

    if (!user || user.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display Single User
export async function showUser(req, res) {
  try {
    const userId = req.params.userId; // Corrected variable name
    const user = await UserModel.findOne({ userId: userId }); // Corrected field name
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Update User
export async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const userDataToUpdate = req.body;

    // Validate user data before update
    const { error } = validateUpdateUser(userDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing user by userId
    const existingUser = await UserModel.findOne({ userId: userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    Object.assign(existingUser, userDataToUpdate);
    const updatedUser = await existingUser.save();

    // Send the updated user as JSON response
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

// Delete User
export async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const updatedUser = await UserModel.findOneAndUpdate(
      { userId: userId },
      { disabled: "true" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Show User Details by Admin ID
export async function showUserDetailsByAdminId(req, res) {
  try {
    const adminId = req.params.adminId;

    // Find all users associated with the provided adminId
    const users = await UserModel.find({ adminId: adminId });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found for the provided adminId" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}



// Search/filter users by userName
export async function searchUsersByUserName(req, res) {
  try {
    const userName = req.params.userName;

    // Find users based on the provided userName (case-insensitive)
    const users = await UserModel.find({ userName: { $regex: new RegExp(userName, "i") } });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found with the provided userName" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export async function sendWithdrawRequest(req, res) {
  try {
    const { userId, amount } = req.body;
    const adminId = req.params.adminId;

    const user = await UserModel.findOne({ userId: userId });
    if (!user) {
      console.error(`User with userId ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const admin = await AdminModel.findOneAndUpdate(
      { adminId: adminId },
      { $push: { withdrawRequests: { userId: userId, amount: amount } } },
      { new: true }
    );

    if (!admin) {
      console.error(`Admin with adminId ${adminId} not found`);
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Withdraw request sent successfully" });
  } catch (error) {
    console.error("Error in sendWithdrawRequest:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}