const { AdminModel } = require('../user/user.model');
const { validateCompany, validateUpdate } = require('./admin.validator');


// Display List
exports.ListRequests = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    console.log(admins);

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: 'No admin requests found' });
    }

    res.status(200).json( admins );
  } catch (error) {
    console.error('Error in ListRequests:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
