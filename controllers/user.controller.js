import UserModel from "../models/user.model.js";
import AdminModel from "../models/admin.model.js";
import bcrypt from "bcrypt";

function generateSponsorId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, "0");
  return `USE-${formattedCount}`;
}

// Create User
export async function userInsert(req, res) {
  try {
    const {
      emailAddress,
      password,
      admin_id,
    } = req.body;

    // Check if emailAddress already exists
    const existingUser = await UserModel.findOne({
      emailAddress: emailAddress,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with the given emailAddress already exists" });
    }

    // Generate sponsorId
    const count = (await UserModel.countDocuments()) + 1; // Get the count of existing documents
    const sponsorId = generateSponsorId(count);

    // Replace the plain password with the hashed one
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert User with sponsorId
    const newUser = new UserModel(req.body);

    newUser.password = hashedPassword;
    newUser.sponsorId = sponsorId;
    const savedUser = await newUser.save();

    if (admin_id) {
      // Create a filter object using the adminId
      const filter = { _id: admin_id };

      // Push the user's sponsorId into the userSponsor_id array of the admin
      await AdminModel.findOneAndUpdate(filter, {
        $push: { user_id: savedUser.sponsorId },
      });
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
    const sponserId = req.params.sponserId; // Corrected variable name
    const user = await UserModel.findOne({ sponsorId: sponserId }); // Corrected field name
    console.log(user);

    if (!user) {
      console.log("---NOT---");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display the User of fromSponsorId and sponsorId
export async function showUserFromSponsorId(req, res) {
  try {
    const searchedSponsorId = req.params.sponserId; // Assuming the parameter is sponsorId

    // Function to recursively find all connected sponsor IDs
    const findAllConnectedSponsors = async (
      searchedId,
      visited = new Set()
    ) => {
      visited.add(searchedId);

      // Find connections where the searchedSponsorId is fromSponsorId
      const connections = await UserModel.find({ fromSponsorId: searchedId });

      if (!connections || connections.length === 0) {
        return [];
      }

      let connectedSponsorIds = connections.map(
        (connection) => connection.sponsorId
      );

      // Recursively find all connected sponsor IDs for each connected sponsor ID
      for (const connectedSponsorId of connectedSponsorIds) {
        if (!visited.has(connectedSponsorId)) {
          const nestedConnections = await findAllConnectedSponsors(
            connectedSponsorId,
            visited
          );
          connectedSponsorIds = connectedSponsorIds.concat(nestedConnections);
        }
      }

      return connectedSponsorIds;
    };

    // Find all connected sponsor IDs recursively
    const allConnectedSponsorIds = await findAllConnectedSponsors(
      searchedSponsorId
    );

    // Retrieve details of the searched sponsor ID
    const searchedSponsor = await UserModel.findOne({
      sponsorId: searchedSponsorId,
    });

    // Retrieve details of all connected sponsor IDs from the UserModel
    const allConnectedSponsorDetails = await UserModel.find({
      sponsorId: { $in: allConnectedSponsorIds },
    });

    // Construct response object including the searchedSponsorId and all connectedSponsorIds with details
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
    const sponsorId = req.params.sponserId;
    const userData = req.body;

    // Get the existing user by ID using Mongoose
    const existingUser = await UserModel.findOneAndUpdate({ sponsorId: sponsorId });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(existingUser, userData);
    const updatedUser = await existingUser.save();

    // Send the updated user as JSON response
    res.status(200).json({ message: "success", user: updatedUser });
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
    const sponserId = req.params.sponsorId;
    const updatedUser = await UserModel.findOneAndUpdate(
      { sponserId: sponserId },
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
