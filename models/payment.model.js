import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = Schema({
  userId: { type: String },
  orderId: { type: String },
  paymentMode: { type: String, enum: ['Cash', 'Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Wallet', 'Other'], default: 'Credit Card' },
  amountPaid: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model("Payment", paymentSchema);
