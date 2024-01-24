const PaymentModel = require('./payment.model');
const { validatePayment, validateUpdate } = require('./payment.validator');

// Insert New payment
// exports.insertPayment = async (req, res, next) => {
//   try {
//     // Validation
//     const { error, value } = validatePayment(req.body);
    
//     // Check Error in Validation
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//       }
      
//     // Insert payment
//     let paymentModel = new PaymentModel();
//     console.log("----Hello", paymentModel);
//     let savedData = await paymentModel.save();
//     console.log("----Hello-----", savedData);

//     // Send Response
//     res.status(200).json({ message: 'Data inserted', data: savedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error inserting data into the database' });
//   }
// };
exports.insertPayment = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validatePayment(req.body);
    
    // Check Error in Validation
    if (error) {
        return res.status(400).send(error.details[0].message);
      }
      
    // Insert payment
    let paymentModel = new PaymentModel(value);
    let savedData = await paymentModel.save();

    // Send Response
    res.status(200).json({ message: 'Data inserted', data: savedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting data into the database' });
  }
};

// Display List
exports.ListPayments = async (req, res, next) => {
  try {
    let payment = await PaymentModel.find({ del_status: "Live" });
    if (!payment || payment.length === 0) {
      console.log('paymentr not found');
      return res.status(404).json({ message: 'payment not found' });
    }
    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display Single payment
exports.showPayment = async (req, res, next) => {
  try {
    let id = req.params.id;
    let payment = await PaymentModel.findOne({ _id: id });

    if (!payment) {
      console.log('payment not found');
      return res.status(404).json({ message: 'payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update payment
exports.updatePayment = async (req, res, next) => {
  try {
    let id = req.params.id;

    // Validation
    let { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let payment = await PaymentModel.findByIdAndUpdate({ _id: id }, value, {
      new: true
    });

    if (!payment) {
      console.log('payment not found');
      return res.status(404).json({ message: 'payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {

    console.log(error);
    // Send Error Response
    res.status(500).json('Error updating payment');
  }
};

// // Delete payment
exports.deletePayment = async (req, res, next) => {
  try {
    let id = req.params.id;

    const updatedPayment = await PaymentModel.findByIdAndUpdate(
      id,
      { del_status: "Deleted" },
      { new: true }
    );

    if (!updatedPayment) {
      console.log('payment not found');
      return res.status(404).json({ message: 'payment not found' });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
