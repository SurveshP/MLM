// userModel.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema({
  admin_id: { type: String, ref: "Admin" },
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
}, {
  timestamps: true
});

export default model("User", userSchema);
