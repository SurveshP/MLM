import WithDrawModel from '../models/withDraw.model.js';

export async function viewWithdrawRequests(req, res) {
  try {
    const adminId = req.params.adminId;
    console.log("adminId--->", adminId);

    const admin = await WithDrawModel.findOne({ adminId: adminId });
    if (!admin) {
      console.error(`Admin with adminId ${adminId} not found`);
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("admin--->", admin);

    const withdrawals = await WithDrawModel.find({ adminId: adminId });
    res.status(200).json({ withdrawals });
  } catch (error) {
    console.error("Error in viewWithdrawRequests:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}