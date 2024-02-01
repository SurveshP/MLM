import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = Schema({
  admin_id: { type: String, required: true },
  sponsorId: { type: String },
  fromSponsorId: { type: String },
  userName: { type: String },
  position: { type: String, enum: ['Left', 'Right'] },
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
