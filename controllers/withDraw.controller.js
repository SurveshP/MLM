import WithDrawModel from '../models/withDraw.model.js';

export async function viewWithdrawRequests(req, res) {
  try {
    const userId = req.params.userId;
    console.log("userId--->", userId);

    const withdraws = await WithDrawModel.find({ userId: userId });
    console.log("admin--->", withdraws);
    if (!withdraws) {
      // console.error(`Admin with adminId ${adminId} not found`);
      return res.status(404).json({ message: "Something Went Wrong" });
    }

    // const withdrawals = await WithDrawModel.find({ adminId: adminId });
    res.status(200).json({ withdraws });
  } catch (error) {
    console.error("Error in viewWithdrawRequests:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

// Define the route and method to handle GET requests for all withdrawal requests
export async function getAllWithdrawRequests(req, res) {
  try {
    // Retrieve all withdrawal requests from the database
    const withdraws = await WithDrawModel.find();

    // Check if there are any withdrawal requests
    if (withdraws.length === 0) {
      return res.status(404).json({ message: "No withdrawal requests found" });
    }

    // If withdrawal requests are found, return them in the response
    res.status(200).json({ withdraws });
  } catch (error) {
    console.error("Error in getAllWithdrawRequests:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}