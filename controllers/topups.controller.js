import TopupsModel from '../models/topups.model.js';
import UserModel from '../models/user.model.js';
import WithDrawModel from '../models/withDraw.model.js';

export async function sendTopupsRequest(req, res) {
  try {
    const { userId, amount } = req.body;
    const adminId = req.params.adminId;

    // Find the user by userId
    const user = await UserModel.findOne({ userId: userId });
    if (!user) {
      console.error(`User with userId ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's wallet has enough balance
    if (user.wallet < amount) {
      return res.status(400).json({ message: "Insufficient balance in the user's wallet" });
    }

    // Deduct the top-up amount from the user's wallet
    user.wallet -= amount;

    // Update the user's wallet
    await user.save();

    // Create a new top-up request
    const topup = new TopupsModel({
      adminId: adminId,
      userId: userId,
      amount: amount,
      requestStatus: 'Approved'
    });

    // Save the top-up request to the database
    await topup.save();

    res.status(200).json({ message: "Top-ups request sent successfully", user });
  } catch (error) {
    console.error("Error in sendTopupsRequest:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

// Controller function
export async function requestStatusFilter(req, res) {
  try {
    const adminId = req.params.adminId;
    const requestStatus = req.params.requestStatus;

    const admin = await TopupsModel.findOne({ adminId: adminId });
    if (!admin) {
      console.error(`Admin with adminId ${adminId} not found`);
      return res.status(404).json({ message: "Admin not found" });
    }

    //const withdrawls = admin.withdrawls.filter(withdraw => withdraw.requestStatus === requestStatus);
    const topups = admin.topups.filter(topups => topups.requestStatus === requestStatus);
    res.status(200).json({ topups });
  } catch (error) {
    console.error("Error in viewTopupsRequestsWithFilter:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}