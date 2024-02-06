// adminIdLimit.middleware.js

import UserModel from '../models/user.model.js';

// Define a middleware function to limit the number of userIds that can be inserted into adminId
export async function adminIdLimit(req, res, next) {
  // Assuming you have a maximum limit of 3 userIds for adminId
  const maxAdminIds = 3;

  // Check if the adminId field is present in the request body
  if (!req.body.adminId) {
    return res.status(400).json({ error: "adminId field is required" });
  }

  // Split the adminId string into an array of userIds
  const adminIds = req.body.adminId.split(',');

  // Check if the number of userIds exceeds the maximum limit
  if (adminIds.length > maxAdminIds) {
    return res.status(400).json({ error: `Exceeded the maximum limit of ${maxAdminIds} userIds in adminId` });
  }

  // Check if any of the adminIds exceed the maximum limit of userIds
  for (const adminId of adminIds) {
    const userCount = await UserModel.countDocuments({ adminId: adminId });
    if (userCount >= maxAdminIds) {
      return res.status(400).json({ error: `Exceeded the maximum limit of ${maxAdminIds} userIds for adminId ${adminId}` });
    }
  }

  // If everything is fine, move to the next middleware or route handler
  next();
}
