const UserModel = require("./user.model");
const CompanyModel  = require("../company/company.model");
const { validateUser, validateUpdate } = require("./user.validator");
const bcrypt = require('bcrypt');

// Insert New User
// exports.userInsert = async (req, res, next) => {
//   try {
//     // Validation
//     let { error, value } = validateUser(req.body);

//     // Check Error in Validation
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     // Insert User
//     let userModel = new UserModel(value);
//     let savedData = await userModel.save();

//     // Send Response
//     res.status(200).json({ message: 'Data inserted', data: savedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting data into the database' });
//   }
// };
// exports.userInsert = async (req, res, next) => {
//   try {
//     // Validation
//     let { error, value } = validateUser(req.body);

//     // Check Error in Validation
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     // Hash the Password
//     const saltRounds = 10; // Adjust the number of salt rounds as needed
//     const hashedPassword = await bcrypt.hash(value.password, saltRounds);

//     // Replace the plain password with the hashed one
//     value.password = hashedPassword;

//     // Insert User
//     let userModel = new UserModel(value);
//     let savedData = await userModel.save();

//     // Send Response
//     res.status(200).json({ message: 'Data inserted', data: savedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting data into the database' });
//   }
// };
exports.userInsert = async (req, res, next) => {
  try {
    // Validation
    let { error, value } = validateUser(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if Email already exists
    const existingEmail = await UserModel.findOne({ email_address: value.email_address });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email with the given name already exists' });
    }

    // Hash the Password
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    // Replace the plain password with the hashed one
    value.password = hashedPassword;

    // Insert User
    let userModel = new UserModel(value);
    let savedUser = await userModel.save();

    // Update company with user_id
    const companyId = req.body.company_id; // Assuming you pass company_id in the request body
    if (companyId) {
      await CompanyModel.findByIdAndUpdate(companyId, { $push: { user_id: savedUser._id } });
    }

    // Send Response
    res.status(200).json({ message: 'User data inserted', data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting user data into the database' });
  }
};

// Display List
exports.showUsers = async (req, res) => {
  try {
    const user = await UserModel.find({ del_status: "Live" });
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
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id, });

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found", });
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
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Get the existing user by ID using Mongoose
    const existingUser = await UserModel.findByIdAndUpdate(
      { _id: id },
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
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
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
