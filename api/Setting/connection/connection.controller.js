const ConnectionModel = require('./connection.model');
const { validateConnection, validateUpdate } = require('./connection.validator');
const UserModel  = require("../user/user.model");

// Insert New connection
// exports.insertConnection = async (req, res, next) => {
//   try {
//     // Validation
//     const { error, value } = validateConnection(req.body);
    
//     // Check Error in Validation
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Insert connection
//     const connectionData = {
//       fromSponserId: value.fromSponserId,
//       toSponserId: value.toSponserId
//     };

//     let connectionModel = new ConnectionModel(connectionData);
//     let savedConnection = await connectionModel.save();

//     // Send Response
//     res.status(200).json({ message: 'Connection data inserted', data: savedConnection });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting connection data into the database' });
//   }
// };
// exports.insertConnection = async (req, res, next) => {
//   try {
//     // Validation
//     const { error, value } = validateConnection(req.body);
    
//     // Check Error in Validation
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Check if the connection already exists
//     const existingConnection = await ConnectionModel.findOne({
//       $or: [
//         { fromSponserId: value.fromSponserId, toSponserId: value.toSponserId },
//         { fromSponserId: value.toSponserId, toSponserId: value.fromSponserId }
//       ]
//     });

//     if (existingConnection) {
//       return res.status(400).json({ error: 'Connection between these sponsors already exists' });
//     }
    
//     // Insert connection
//     const connectionData = {
//       fromSponserId: value.fromSponserId,
//       toSponserId: value.toSponserId
//     };

//     let connectionModel = new ConnectionModel(connectionData);
//     let savedConnection = await connectionModel.save();

//     // Send Response
//     res.status(200).json({ message: 'Connection data inserted', data: savedConnection });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting connection data into the database' });
//   }
// };
// exports.insertConnection = async (req, res, next) => {
//   try {
//     // Validation
//     const { error, value } = validateConnection(req.body);
    
//     // Check Error in Validation
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Check if the sponsor has already connected to two sponsors
//     const existingConnectionsCount = await ConnectionModel.countDocuments({
//       $or: [
//         { fromSponserId: value.fromSponserId },
//         { toSponserId: value.fromSponserId }
//       ]
//     });

//     if (existingConnectionsCount >= 2) {
//       return res.status(400).json({ error: 'This sponsor has already connected to two sponsors' });
//     }

//     // Insert connection
//     const connectionData = {
//       fromSponserId: value.fromSponserId,
//       toSponserId: value.toSponserId
//     };

//     let connectionModel = new ConnectionModel(connectionData);
//     let savedConnection = await connectionModel.save();

//     // Send Response
//     res.status(200).json({ message: 'Connection data inserted', data: savedConnection });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting connection data into the database' });
//   }
// };
exports.insertConnection = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateConnection(req.body);
    
    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the sponsors are already connected
    const existingConnection = await ConnectionModel.findOne({
      $or: [
        { fromSponserId: value.fromSponserId, toSponserId: value.toSponserId },
        { fromSponserId: value.toSponserId, toSponserId: value.fromSponserId }
      ]
    });

    if (existingConnection) {
      return res.status(400).json({ error: 'This sponsors are already connected' });
    }

    // Check if either sponsor has already connected to two sponsors
    const fromSponsorConnectionsCount = await ConnectionModel.countDocuments({
      fromSponserId: value.fromSponserId
    });
    
    const toSponsorConnectionsCount = await ConnectionModel.countDocuments({
      toSponserId: value.toSponserId
    });

    if (fromSponsorConnectionsCount >= 2 || toSponsorConnectionsCount >= 2) {
      return res.status(400).json({ error: 'One of the sponsors has already connected to two sponsors' });
    }

    // Check if toSponserId is already connected to another fromSponserId
    const existingToSponsorConnection = await ConnectionModel.findOne({
      toSponserId: value.toSponserId
    });

    if (existingToSponsorConnection) {
      return res.status(400).json({ error: 'toSponserId is already connected to another fromSponserId' });
    }

    // Insert connection
    const connectionData = {
      fromSponserId: value.fromSponserId,
      toSponserId: value.toSponserId
    };

    let connectionModel = new ConnectionModel(connectionData);
    let savedConnection = await connectionModel.save();

    // Send Response
    res.status(200).json({ message: 'Connection data inserted', data: savedConnection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting connection data into the database' });
  }
};

// Display List
exports.ListConnections = async (req, res, next) => {
  try {
    let connection = await ConnectionModel.find({ disabled: false });
    if (!connection || connection.length === 0) {
      console.log('connectionr not found');
      return res.status(404).json({ message: 'connection not found' });
    }
    res.status(200).json({ message: "success", connection });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single connection
// exports.showConnection = async (req, res, next) => {
//   try {
//     let sponserId = req.params.sponserId; // Assuming the parameter is sponserId
//     let connection = await ConnectionModel.findOne({ sponserId: sponserId })
//     .populate({
//       path: "users",
//       match:{disabled: false}
//     });

//     if (!connection) {
//       console.log('Connection not found');
//       return res.status(404).json({ message: 'Connection not found' });
//     }

//     res.status(200).json({ connection });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
exports.showConnection = async (req, res, next) => {
  try {
    const searchedSponserId = req.params.sponserId; // Assuming the parameter is sponserId

    // Find connections where the searchedSponserId is fromSponserId
    const connections = await ConnectionModel.find({ fromSponserId: searchedSponserId });

    // Check if any connections are found
    if (!connections || connections.length === 0) {
      console.log('Connection not found');
      return res.status(404).json({ message: 'Connection not found' });
    }

    const connectedSponserIds = connections.map(connection => connection.toSponserId);

    // Retrieve details of the searched sponsor ID
    const searchedSponser = await UserModel.findOne({ sponserId: searchedSponserId });

    // Retrieve details of connected sponsor IDs from the UserModel
    const connectedSponserDetails = await UserModel.find({ sponserId: { $in: connectedSponserIds } });

    // Construct response object including the searchedSponserId and its connectedSponserIds with details
    const response = {
      searchedSponser: searchedSponser,
      connectedSponserDetails: connectedSponserDetails
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// exports.showConnection = async (req, res, next) => {
//   try {
//     const searchedSponserId = req.params.sponserId; // Assuming the parameter is sponserId

//     // Find connections where the searchedSponserId is fromSponserId
//     const connections = await ConnectionModel.find({ fromSponserId: searchedSponserId });

//     // Check if any connections are found
//     if (!connections || connections.length === 0) {
//       console.log('Connection not found');
//       return res.status(404).json({ message: 'Connection not found' });
//     }

//     const connectedSponserIds = connections.map(connection => connection.toSponserId);

//     // Construct response object including the searchedSponserId and its connectedSponserIds
//     const response = {
//       searchedSponserId: searchedSponserId,
//       connectedSponserIds: connectedSponserIds
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };


















// Update connection
exports.updateConnection = async (req, res, next) => {
  try {
    let sponserId = req.params.sponserId;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find and update connection based on sponserId
    let connection = await ConnectionModel.findOneAndUpdate({ sponserId: sponserId }, value, {
      new: true,
      runValidators: true // Ensure validation is applied on update
    });

    if (!connection) {
      console.log('Connection not found');
      return res.status(404).json({ message: 'Connection not found' });
    }

    res.status(200).json({ connection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating connection' });
  }
};

// // Delete connection
exports.deleteConnection = async (req, res, next) => {
  try {
    let sponserId = req.params.sponserId;

    const updatedConnection = await ConnectionModel.findOneAndUpdate(
      { sponserId: sponserId },
      { disabled: true },
      { new: true }
    );

    if (!updatedConnection) {
      console.log('Connection not found');
      return res.status(404).json({ message: 'Connection not found' });
    }

    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

