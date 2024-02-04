import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = Schema({
  userId: { type: String },
  product: [{ productId: { type: String }, quantity: { type: Number, min: 0, default: 0 } }],
  orderId: { type: String },
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  deliveryAddress: { type: String },
  totalPrice: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model("Order", orderSchema);
