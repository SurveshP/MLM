const CompanyModel = require('./company.model');
const { validateCompany, validateUpdate } = require('./company.validator');

// Insert New company
// exports.insertCompany = async (req, res, next) => {
//   try {
//     // Validation
//     const { error, value } = validateCompany(req.body);
    
//     // Check Error in Validation
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//       }
      
//     // Insert company
//     let companyModel = new CompanyModel(value);
//     let savedData = await companyModel.save();

//     // Send Response
//     res.status(200).json({ message: 'Data inserted', data: savedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting data into the database' });
//   }
// };
exports.insertCompany = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateCompany(req.body);
    
    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if CompanyName already exists
    const existingCompanyName = await UserModel.findOne({ companyName: value.companyName });
    if (existingCompanyName) {
      return res.status(400).json({ error: 'Company with the given name already exists' });
    }
    
    // Insert company
    let companyModel = new CompanyModel(value);
    let savedCompany = await companyModel.save();

    // Send Response
    res.status(200).json({ message: 'Company data inserted', data: savedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting company data into the database' });
  }
};

// Display List
exports.ListCompanys = async (req, res, next) => {
  try {
    let company = await CompanyModel.find({ del_status: "Live" });
    if (!company || company.length === 0) {
      console.log('companyr not found');
      return res.status(404).json({ message: 'company not found' });
    }
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display Single company
exports.showCompany = async (req, res, next) => {
  try {
    let id = req.params.id;
    let company = await CompanyModel.findOne({ _id: id });

    if (!company) {
      console.log('company not found');
      return res.status(404).json({ message: 'company not found' });
    }

    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update company
exports.updateCompany = async (req, res, next) => {
  try {
    let id = req.params.id;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let company = await CompanyModel.findByIdAndUpdate({ _id: id }, value, {
      new: true
    });

    if (!company) {
      console.log('company not found');
      return res.status(404).json({ message: 'company not found' });
    }

    res.status(200).json({ company });
  } catch (error) {

    console.log(error);
    // Send Error Response
    res.status(500).json('Error updating company');
  }
};

// // Delete company
exports.deleteCompany = async (req, res, next) => {
  try {
    let id = req.params.id;

    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
      { new: true }
    );

    if (!updatedCompany) {
      console.log('company not found');
      return res.status(404).json({ message: 'company not found' });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
