import UserModel from "../models/user.model.js";
import AdminModel from "../models/admin.model.js";
import { validateCreateUser, validateUpdateUser } from '../validators/user.validator.js';
import bcrypt from "bcrypt";

function generateuserId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, "0");
  return `USE-${formattedCount}`;
}

// Create User
export async function userInsert(req, res) {
  try {
    const userDate = req.body;


    // Validate admin data before insertion
    const { error } = validateCreateUser(userDate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if emailAddress already exists
    const existingUser = await UserModel.findOne({
      emailAddress: userDate.emailAddress,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with the given emailAddress already exists" });
    }

    // Generate userId
    const count = (await UserModel.countDocuments()) + 1; // Get the count of existing documents
    const userId = generateuserId(count);

    // Replace the plain password with the hashed one
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(userDate.password, saltRounds);

    // Insert User with userId
    const newUser = new UserModel(userDate);
    newUser.password = hashedPassword;
    newUser.userId = userId;
    const savedUser = await newUser.save();

    // Update Admin with user's userId
    const adminId = userDate.adminId; // Assuming you pass admin_id in the request body
    console.log("adminId--->", adminId);
    if (adminId) {
      try {
        // Find the admin by userId
        const admin = await AdminModel.findOne({ adminId: adminId });
        console.log("admin--->", admin);
        if (admin) {
          // Push user's userId to the admin's userId array
          admin.userId.push(userId);
          // Save the admin
          await admin.save();
        } else {
          throw new Error("Admin not found");
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message || "Error updating admin with userId",
        });
      }
    }




    // Send Response
    res.status(200).json({ message: "User data inserted", data: savedUser });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
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

// Display the User of fromuserId and userId
export async function showUserFromuserId(req, res) {
  try {
    const searcheduserId = req.params.userId; // Assuming the parameter is userId

    // Function to recursively find all connected sponsor IDs
    const findAllConnectedSponsors = async (
      searchedId,
      visited = new Set()
    ) => {
      visited.add(searchedId);

      // Find connections where the searcheduserId is fromuserId
      const connections = await UserModel.find({ fromuserId: searchedId });

      if (!connections || connections.length === 0) {
        return [];
      }

      let connecteduserIds = connections.map(
        (connection) => connection.userId
      );

      // Recursively find all connected sponsor IDs for each connected sponsor ID
      for (const connecteduserId of connecteduserIds) {
        if (!visited.has(connecteduserId)) {
          const nestedConnections = await findAllConnectedSponsors(
            connecteduserId,
            visited
          );
          connecteduserIds = connecteduserIds.concat(nestedConnections);
        }
      }

      return connecteduserIds;
    };

    // Find all connected sponsor IDs recursively
    const allConnecteduserIds = await findAllConnectedSponsors(
      searcheduserId
    );

    // Retrieve details of the searched sponsor ID
    const searchedSponsor = await UserModel.findOne({
      userId: searcheduserId,
    });

    // Retrieve details of all connected sponsor IDs from the UserModel
    const allConnectedSponsorDetails = await UserModel.find({
      userId: { $in: allConnecteduserIds },
    });

    // Construct response object including the searcheduserId and all connecteduserIds with details
    const response = {
      searchedSponsor: searchedSponsor,
      allConnectedSponsorDetails: allConnectedSponsorDetails,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
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

