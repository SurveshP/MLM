import AdminSupportModel from '../models/adminSupport.model.js';
import SupportModel from '../models/support.model.js'; // Import SupportModel

export async function viewAdminSupportRequests(req, res) {
  try {
    const adminId = req.params.adminId;
    console.log("adminId--->", adminId);

    const admin = await AdminSupportModel.findOne({ adminId: adminId });
    if (!admin) {
      console.error(`Admin with adminId ${adminId} not found`);
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("admin--->", admin);

    const AdminSupportals = await AdminSupportModel.find({ adminId: adminId });
    res.status(200).json({ AdminSupportals });
  } catch (error) {
    console.error("Error in viewAdminSupportRequests:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export async function replyToSupportRequest(req, res) {
  try {
    const { userId, ticketToken, response } = req.body;

    // Update supportSchema
    const supportRequest = await SupportModel.findOneAndUpdate(
      { userId: userId, ticketToken: ticketToken },
      { $set: { requestStatus: "Replied" } },
      { new: true }
    );

    if (!supportRequest) {
      console.error(`Support request with userId ${userId} and ticketToken ${ticketToken} not found`);
      return res.status(404).json({ message: "Support request not found" });
    }

    // Update adminSupportSchema
    const adminSupportRequest = await AdminSupportModel.findOneAndUpdate(
      { userId: userId, ticketToken: ticketToken },
      { $set: { requestStatus: "Approved" } },
      { new: true }
    );

    if (!adminSupportRequest) {
      console.error(`Admin support request with userId ${userId} and ticketToken ${ticketToken} not found`);
      return res.status(404).json({ message: "Admin support request not found" });
    }

    // You can do something with the response here if needed

    res.status(200).json({ message: "Support request replied and admin support request approved successfully" });
  } catch (error) {
    console.error("Error replying to support request:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}