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
function generateSponsorId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, '0');
  return `RAL-${formattedCount}`;
}

exports.insertCompany = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateCompany(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if CompanyName already exists
    const existingCompanyName = await CompanyModel.findOne({ companyName: value.companyName });
    if (existingCompanyName) {
      return res.status(400).json({ error: 'Company with the given name already exists' });
    }

    // Generate sponsorId
    const count = await CompanyModel.countDocuments() + 1; // Get the count of existing documents
    const sponsorId = generateSponsorId(count);
    
    // Insert company with sponsorId
    const companyData = { ...value, sponserId: sponsorId };
    let companyModel = new CompanyModel(companyData);
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
    let company = await CompanyModel.find({ disabled: false });
    if (!company || company.length === 0) {
      console.log('companyr not found');
      return res.status(404).json({ message: 'company not found' });
    }
    res.status(200).json({ message: "success", company });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single company
exports.showCompany = async (req, res, next) => {
  try {
    let sponserId = req.params.sponserId; // Assuming the parameter is sponserId
    let company = await CompanyModel.findOne({ sponserId: sponserId });

    if (!company) {
      console.log('Company not found');
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error });
  }
};


// Update company
exports.updateCompany = async (req, res, next) => {
  try {
    let sponserId = req.params.sponserId;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find and update company based on sponserId
    let company = await CompanyModel.findOneAndUpdate({ sponserId: sponserId }, value, {
      new: true,
      runValidators: true // Ensure validation is applied on update
    });

    if (!company) {
      console.log('Company not found');
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating company' });
  }
};

// // Delete company
exports.deleteCompany = async (req, res, next) => {
  try {
    let sponserId = req.params.sponserId;

    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { sponserId: sponserId },
      { disabled: true },
      { new: true }
    );

    if (!updatedCompany) {
      console.log('Company not found');
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

