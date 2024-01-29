const { UserModel, AdminModel } = require("./user.model");
const CompanyModel  = require("../company/company.model");
const { validateUser, validateUpdate } = require("./user.validator");
const bcrypt = require('bcrypt');

// Insert New User
function generateSponsorId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, '0');
  return `USE-${formattedCount}`;
}

//Display List
exports.userInsert = async (req, res, next) => {
  try {
    // Validation
    let { error, value } = validateUser(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if emailAddress already exists
    const existingUserName = await UserModel.findOne({ emailAddress: value.emailAddress });
    if (existingUserName) {
      return res.status(400).json({ error: 'User with the given emailAddress already exists' });
    }

    // Hash the Password
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    // Replace the plain password with the hashed one
    value.password = hashedPassword;

    // Generate sponsorId
    const count = await UserModel.countDocuments() + 1; // Get the count of existing documents
    const sponsorId = generateSponsorId(count);

    // Insert User with sponsorId
    value.sponserId = sponsorId;
    let userModel = new UserModel(value);
    let savedUser = await userModel.save();

    // Update company with userSponser_id
    const companyId = req.body.company_id; // Assuming you pass company_id in the request body
    if (companyId) {
      // Create a filter object using the companyId
      const filter = { _id: companyId };

      // Push the user's sponsorId into the userSponser_id array of the company
      await CompanyModel.findOneAndUpdate(filter, { $push: { userSponser_id: savedUser.sponserId } });
    }

    // Send Response
    res.status(200).json({ message: 'User data inserted', data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting user data into the database' });
  }
};

exports.showUsers = async (req, res) => {
  try {
    const user = await UserModel.find({ disabled: "false" });
    console.log(user);

    if (!user || user.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found", });
    }

    res.status(200).json({ user, });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message, });
  }
};

// Display Single User
exports.showUser = async (req, res, next) => {
  try {
    const sponserId = req.params.sponserId; // Corrected variable name
    console.log(sponserId);
    const user = await UserModel.findOne({ sponserId: sponserId }); // Corrected field name
    console.log(user);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Update User
// exports.updateUser = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     console.log("--",userId);
//     const userData = req.body;
//     console.log("--Hello",userData);
    
//     // Get the existing user by ID using Mongoose
//     // const existingUser = await UserModel.findOneAndUpdate(userId);
//     const existingUser = await UserModel.findByIdAndUpdate(userId);
//     console.log("--existing",existingUser);
    
//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found', });
//     }
    
//     // Object.assign(existingUser, userData);
//     const updatedUser = await existingUser.save();
//     console.log("--Update",updatedUser);
    
//     // Send the updated user as JSON response
//     res.status(200).json({  message: 'success', user: updatedUser });
//   } catch (error) {
//     // Send Error Response
//     res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// };
exports.updateUser = async (req, res, next) => {
  try {
    const sponserId = req.params.sponserId;

    // Validation
    const { error, value } = validateUpdate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Get the existing user by ID using Mongoose
    const existingUser = await UserModel.findOneAndUpdate(
      { sponserId: sponserId },
      value,
      { new: true }
    );
    
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found', });
    }
    
    // Object.assign(existingUser, userData);
    // const updatedUser = await existingUser.save();
    
    // Send the updated user as JSON response
    res.status(200).json({  message: 'success', user: existingUser });
  } catch (error) {
    // Send Error Response
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const sponserId = req.params.sponserId;
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
};


/* Wallet WithDrawal request */
exports.WithDrawalRequest = async (req, res, next) => {
  try {
    const { sponserId, walletAmount } = req.body;
    const newWithdrawalRequest = new AdminModel({ 
      sponserId: sponserId ,
      walletAmount: walletAmount ,
      type: "WithDrawal"
      });
      const savedWithdrawalRequest = await newWithdrawalRequest.save();

      if (!savedWithdrawalRequest) {
        return res.status(404).json({ message: "User not found." });
      }

    res.status(200).json({ message: "WithDrawal request added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

/* Wallet Add request */
exports.AddRequest = async (req, res, next) => {
  try {
    const { sponserId, walletAmount } = req.body;
    const newAddrequest = new AdminModel({ 
      sponserId: sponserId ,
      walletAmount: walletAmount ,
      type: "Add"
    });
    const savedAddrequest = await newAddrequest.save();

    if (!savedAddrequest) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Add request added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
