import PaymentModel from '../models/payment.model.js';
import { validateCreatePayment, validateUpdatePayment } from '../validators/payment.validator.js';

// Insert New payment
export async function insertPayment(req, res) {
  try {
    const paymentData = req.body;

    // Validate payment data before insertion
    const { error } = validateCreatePayment(paymentData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Payment
    const newPayment = new PaymentModel(paymentData);
    const savedPayment = await newPayment.save();

    // Send Response
    res.status(200).json({ message: "Payment data inserted", data: savedPayment });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
}


// Display List
export async function ListPayments(req, res, next) {
  try {
    let payment = await PaymentModel.find();
    if (!payment || payment.length === 0) {
      console.log('paymentr not found');
      return res.status(404).json({ message: 'payment not found' });
    }
    res.status(200).json({ message: "success", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single payment
export async function showPayment(req, res, next) {
  try {
    let id = req.params.id; // Assuming the parameter is paymentId
    let payment = await PaymentModel.findById({ _id: id });

    if (!payment) {
      console.log('Payment not found');
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving payment' });
  }
};

// Update payment
export async function updatePayment(req, res, next) {
  try {
    const id = req.params.id;
    const paymentDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdatePayment(paymentDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing payment by ID using Mongoose
    const existingPayment = await PaymentModel.findByIdAndUpdate({ _id: id });

    if (!existingPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingPayment, paymentDataToUpdate);

    // Save the updated payment
    const updatedPayment = await existingPayment.save();

    // Send the updated payment as JSON response
    res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete payment
export async function deletePayment(req, res, next) {
  try {
    let id = req.params.id;

    const deletePayment = await PaymentModel.deleteOne(
      { _id: id },
      { new: true }
    );

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
