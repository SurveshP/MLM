import AccountModel from '../models/account.model.js';
import { validateCreateAccount, validateUpdateAccount } from '../validators/account.validator.js';

// Insert New account
export async function insertAccount(req, res) {
  try {
    const accountData = req.body;

    // Validate account data before insertion
    const { error } = validateCreateAccount(accountData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Account with itemId
    const newAccount = new AccountModel(accountData);
    const savedAccount = await newAccount.save();

    // Send Response
    res.status(200).json({ message: "Account data inserted", data: savedAccount });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

// Display List
export async function  ListAccounts(req, res, next){
  try {
    let account = await AccountModel.find();
    if (!account || account.length === 0) {
      console.log('accountr not found');
      return res.status(404).json({ message: 'account not found' });
    }
    res.status(200).json({ message: "success", account });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single account
export async function  showAccount(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is accountId
    let account = await AccountModel.findOne({_id: id});

    if (!account) {
      console.log('Account not found');
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json({ account });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving account' });
  }
};

// Update account
export async function updateAccount(req, res, next) {
  try {
    const id = req.params.id;
    const accountDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateAccount(accountDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing account by ID using Mongoose
    const existingAccount = await AccountModel.findOne({ _id: id });

    if (!existingAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingAccount, accountDataToUpdate);

    // Save the updated account
    const updatedAccount = await existingAccount.save();

    // Send the updated account as JSON response
    res.status(200).json({ message: 'Account updated successfully', account: updatedAccount });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete account
export async function  deleteAccount(req, res, next){
  try {
    let id = req.params.id;

    const updatedAccount = await AccountModel.deleteOne(
      { _id: id },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Method to get the list of account IDs with userId
export async function listAccountsByUserId(req, res) {
  try {
    const userId = req.params.userId;

    // Find accounts with the specified userId
    const accounts = await AccountModel.find({ userId: userId });

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: 'No accounts found for the given userId' });
    }

    res.status(200).json({ userId: userId, accounts: accounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}