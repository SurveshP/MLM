// levelBasedLimit.middleware.js

import UserModel from '../models/user.model.js';

// Define a middleware function to limit the number of userIds based on the level
export async function levelBasedLimit(req, res, next) {
  // Extract level from request body or query parameters
  const { level } = req.body; // Assuming level is sent in the request body

  // Ensure level is provided
  if (!level) {
    return res.status(400).json({ error: "Level is required" });
  }

  // Calculate the maximum limit of userIds based on the level
  const maxUserIds = Math.pow(3, level); // Square of the level

  // Check if the adminId field is present in the request body
  if (!req.body.adminId) {
    return res.status(400).json({ error: "adminId field is required" });
  }

  // Split the adminId string into an array of userIds
  const adminIds = req.body.adminId.split(',');

  // Check if the number of userIds exceeds the maximum limit
  if (adminIds.length > maxUserIds) {
    return res.status(400).json({ error: `Exceeded the maximum limit of ${maxUserIds} userIds in adminId` });
  }

  // Check if any of the adminIds exceed the maximum limit of userIds
  for (const adminId of adminIds) {
    const userCount = await UserModel.countDocuments({ adminId: adminId });
    if (userCount >= maxUserIds) {
      return res.status(400).json({ error: `Exceeded the maximum limit of ${maxUserIds} userIds for adminId ${adminId}` });
    }
  }

  // If everything is fine, move to the next middleware or route handler
  next();
}
