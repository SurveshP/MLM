import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = Schema({
  adminId: { type: String },
  userId: { type: String },
  // fromuserId: { type: String },
  wallet: { type: Number, default: 0 },
  userName: { type: String },
  position: { type: String, enum: ['Left', 'Center', 'Right'] },
  type: { type: String },
  contactNumber: { type: Number },
  location: { type: String },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  orderId: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);